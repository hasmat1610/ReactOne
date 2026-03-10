import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { email, password, name } = await req.json();

    // 1. Initialize Supabase Admin Client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    // 2. Create User in Supabase Auth
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: false, // Don't confirm yet
    });

    if (userError) throw userError;

    // 3. Generate Verification Link
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'signup',
      email,
      options: { redirectTo: `${Deno.env.get('PUBLIC_SITE_URL') || 'http://localhost:5173'}/profile` }
    });

    if (linkError) throw linkError;

    const verificationUrl = linkData.properties.action_link;

    // 4. Send Email via Resend
    const { error: emailError } = await resend.emails.send({
      from: 'ReactOne <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to ReactOne! Please confirm your email',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e1e1e1; border-radius: 12px;">
          <h1 style="color: #216be4;">Welcome to ReactOne!</h1>
          <p>Hi ${name},</p>
          <p>We're thrilled to have you on board. To get started, please confirm your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 40px 0;">
            <a href="${verificationUrl}" style="background-color: #216be4; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Verify Email Address</a>
          </div>
          <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #216be4; font-size: 12px; word-break: break-all;">${verificationUrl}</p>
          <hr style="border: 0; border-top: 1px solid #e1e1e1; margin: 40px 0;" />
          <p style="color: #999; font-size: 12px;">&copy; 2026 ReactOne. 123 React Way, Code City.</p>
        </div>
      `,
    });

    if (emailError) throw emailError;

    return new Response(JSON.stringify({ message: 'User created' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
