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
    const { email } = await req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    // 1. Generate Link for existing user
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'signup',
      email,
      options: { redirectTo: `${Deno.env.get('PUBLIC_SITE_URL') || 'http://localhost:5173'}/profile` }
    });

    if (linkError) throw linkError;

    const verificationUrl = linkData.properties.action_link;

    // 2. Send Email
    const { error: emailError } = await resend.emails.send({
      from: 'ReactOne <onboarding@resend.dev>',
      to: [email],
      subject: 'Resending your verification link - ReactOne',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e1e1e1; border-radius: 12px;">
          <h1 style="color: #216be4;">Verify your account</h1>
          <p>You requested a new verification link. Please click the button below to confirm your email:</p>
          <div style="text-align: center; margin: 40px 0;">
            <a href="${verificationUrl}" style="background-color: #216be4; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Verify Email Address</a>
          </div>
          <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
          <p style="color: #216be4; font-size: 12px; word-break: break-all;">${verificationUrl}</p>
        </div>
      `,
    });

    if (emailError) throw emailError;

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
