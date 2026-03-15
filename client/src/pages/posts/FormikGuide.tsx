import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit3, ShieldCheck, Settings, Download, Copy, CheckCircle2, Code } from 'lucide-react';
import HeroBanner from '../../components/blog/HeroBanner';

interface GuideFile {
    name: string;
    content: string;
}

interface GuideItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    files: GuideFile[];
}

const guideData: GuideItem[] = [
    {
        id: 'setup',
        title: 'Setup & Installation',
        icon: <Download className="w-[18px] h-[18px]" />,
        files: [
            {
                name: 'Terminal',
                content: `npm install formik yup`
            },
            {
                name: 'Why Formik?.txt',
                content: `// Formik helps you with the 3 most annoying parts of React forms:
// 1. Getting values in and out of form state
// 2. Validation and error messages
// 3. Handling form submission
// By using Formik alongside Yup (for object schema validation),
// building complex forms becomes a breeze.`
            }
        ]
    },
    {
        id: 'basic',
        title: 'Basic Usage',
        icon: <Edit3 className="w-[18px] h-[18px]" />,
        files: [
            {
                name: 'BasicForm.jsx',
                content: `import React from 'react';
import { useFormik } from 'formik';

const BasicForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 max-w-sm">
      <div>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full border p-2 rounded text-black"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="w-full border p-2 rounded text-black"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default BasicForm;`
            }
        ]
    },
    {
        id: 'validation',
        title: 'Validation with Yup',
        icon: <ShieldCheck className="w-[18px] h-[18px]" />,
        files: [
            {
                name: 'ValidationForm.jsx',
                content: `import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ValidationForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 max-w-sm">
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          {...formik.getFieldProps('firstName')}
          className="w-full border p-2 rounded text-black"
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          {...formik.getFieldProps('email')}
          className="w-full border p-2 rounded text-black"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        ) : null}
      </div>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default ValidationForm;`
            }
        ]
    },
    {
        id: 'components',
        title: 'Formik Components',
        icon: <Settings className="w-[18px] h-[18px]" />,
        files: [
            {
                name: 'ComponentForm.jsx',
                content: `import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Using Formik's built-in components reduces boilerplate significantly
const ComponentForm = () => {
  return (
    <Formik
      initialValues={{ firstName: '', email: '' }}
      validationSchema={Yup.object({
        firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className="flex flex-col gap-4 max-w-sm">
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" type="text" className="w-full border p-2 rounded text-black" />
          <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" className="w-full border p-2 rounded text-black" />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default ComponentForm;`
            }
        ]
    }
];

const FormikGuide = () => {
    const [activeGuideId, setActiveGuideId] = useState(guideData[0]?.id || 'setup');
    const [activeFileIndex, setActiveFileIndex] = useState(0);
    const [isCopied, setIsCopied] = useState(false);

    const activeGuide = guideData.find(g => g.id === activeGuideId);

    if (!activeGuide) return null;

    const handleGuideChange = (id: string) => {
        setActiveGuideId(id);
        setActiveFileIndex(0);
        setIsCopied(false);
    };

    const handleCopy = () => {
        const file = activeGuide.files[activeFileIndex];
        if (file) {
            navigator.clipboard.writeText(file.content);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-[#060913] text-slate-200 font-sans pb-24 selection:bg-blue-500/30">

            {/* Navigation Bar */}
            

            {/* ── Hero Banner ── */}
            <HeroBanner
                badgeText="Implementation Ready"
                badgeIcon={Code}
                title="Formik"
                subtitle="Data Collection and Validation in React"
                date="Mar 06, 2026"
                gradientContainer="from-slate-900 via-blue-900/60 to-[#0a0f18]"
                radialBackground="radial-gradient(circle at 50% 120%, rgba(0, 85, 255, 0.4), transparent 50%), radial-gradient(circle at 10% 20%, rgba(45, 120, 255, 0.3), transparent 30%)"
                badgeContainerStyles="border border-blue-500/30 bg-blue-500/10"
                badgeTextStyles="text-blue-400"
                titleGradient="from-white to-white/60"
                subtitleColor="text-blue-300/70"
                avatarRing="from-indigo-400 to-blue-600"
                dateColor="text-slate-400"
            />

            {/* Deep Dive Article Content */}
            <div className="container mx-auto px-4 max-w-4xl pb-16">

        <article className="prose prose-invert prose-lg max-w-none">

                    <h2 className="text-3xl font-bold text-white mb-6">Introduction</h2>
                    <p className="mb-6 leading-relaxed text-slate-300">
                        Forms are notoriously difficult in React. You have to manage controlled inputs, track touched state for when to show validations, handle submission, and wire up validation schemas. Formik is an incredible library that abstracts all this boilerplate away, letting you focus on the UI and business logic instead of form state mechanics.
                    </p>

                    <h2 className="text-3xl font-bold text-white mb-6">Why Formik?</h2>
                    <p className="mb-6 leading-relaxed text-slate-300">
                        Building forms from scratch requires constant repetition of state variables (<code>name</code>, <code>email</code>, <code>password</code>) and manual event handlers for every single input. Formik centralizes the form state, validation, and submission cycle.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 not-prose">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10">
                            <ShieldCheck className="w-8 h-8 text-blue-400 mb-4" />
                            <h3 className="text-white font-semibold text-lg mb-2">Seamless Validation</h3>
                            <p className="text-sm text-slate-400">Integrated tightly with Yup for declarative schema-based validation. Errors are automatically tracked per field.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10">
                            <Settings className="w-8 h-8 text-pink-400 mb-4" />
                            <h3 className="text-white font-semibold text-lg mb-2">Less Boilerplate</h3>
                            <p className="text-sm text-slate-400">Helper components like &lt;Field /&gt; and &lt;Form /&gt; automatically wire up your inputs without manual onChange handlers.</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
                        <span className="bg-white/10 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                        Installation
                    </h2>
                    <p className="mb-4 text-slate-300">Formik pairs best with Yup for validation. Install both:</p>

                    <div className="bg-[#1e1e24] rounded-xl overflow-hidden mb-10 border border-white/10 not-prose">
                        <div className="flex items-center px-4 py-3 bg-[#18181b] border-b border-white/5">
                            <div className="flex gap-2 flex-1">
                                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono tracking-wider uppercase">Terminal</div>
                        </div>
                        <div className="p-5 overflow-x-auto">
                            <pre className="text-[15px] font-mono text-slate-300 m-0 bg-transparent p-0"><code>npm install formik yup</code></pre>
                        </div>
                    </div>

                </article>
            </div>

            {/* Main Layout Container */}
            <main className="container mx-auto px-4 max-w-6xl mt-12 md:mt-20">
                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 w-full">

                    {/* Sidebar Navigation */}
                    <div className="w-full lg:w-72 shrink-0">
                        <h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Form Handling</h3>
                        <div className="flex flex-col gap-2">
                            {guideData.map((guide) => (
                                <button
                                    key={guide.id}
                                    onClick={() => handleGuideChange(guide.id)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 text-sm font-medium w-full text-left
                                ${activeGuideId === guide.id
                                            ? 'bg-[#0f1b2d] border-blue-500/30 text-blue-400 shadow-[0_0_15px_-3px_rgba(59,130,246,0.15)]'
                                            : 'bg-transparent border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200 hover:border-white/10'
                                        }
                            `}
                                >
                                    <span className={`${activeGuideId === guide.id ? 'text-blue-400' : 'text-slate-500'}`}>
                                        {guide.icon}
                                    </span>
                                    {guide.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Code Window */}
                    <div className="w-full flex-1 bg-[#0d121c] rounded-2xl overflow-hidden border border-[#1e293b] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col min-h-[500px] lg:min-h-[600px] relative">

                        {/* Window Header */}
                        <div className="bg-[#151b2b] border-b border-[#1e293b] px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 relative z-10">

                            <div className="flex items-center gap-6 overflow-hidden w-full">
                                <div className="flex items-center gap-2 shrink-0">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                </div>

                                <div className="flex gap-2 overflow-x-auto custom-scrollbar flex-1 pb-1 sm:pb-0">
                                    {activeGuide.files.map((file, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveFileIndex(idx)}
                                            className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors whitespace-nowrap
                                        ${activeFileIndex === idx
                                                    ? 'bg-[#1e293b] text-white shadow-sm'
                                                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                                }
                                    `}
                                        >
                                            {file.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleCopy}
                                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-slate-400 hover:text-slate-200 hover:bg-[#1e293b] border border-[#1e293b] transition-all shrink-0"
                            >
                                {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                {isCopied ? 'Copied' : 'Copy'}
                            </button>
                        </div>

                        <button
                            onClick={handleCopy}
                            className="sm:hidden absolute top-16 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-md bg-[#1e293b]/80 backdrop-blur border border-white/10 text-slate-300"
                        >
                            {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>

                        <div className="flex-1 p-5 sm:p-8 overflow-auto relative custom-scrollbar bg-[#0d121c]">
                            <pre className="text-[14px] sm:text-[15px] leading-relaxed font-mono text-[#a5b4fc] m-0">
                                <code>
                                    {activeGuide.files[activeFileIndex]?.content}
                                </code>
                            </pre>
                        </div>

                    </div>
                </div>
            </main>

            <div className="container mx-auto max-w-6xl px-4 mt-8 pb-12 flex justify-end">
                <p className="text-xs text-slate-600 font-medium">Form Handling Implementation Reference</p>
            </div>

        </div>
    );
};

export default FormikGuide;

