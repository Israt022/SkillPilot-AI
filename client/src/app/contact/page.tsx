"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="flex-1 px-4">

      <section className="container-custom relative mx-auto py-16">

        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(99,102,241,0.12), transparent)",
          }}
        />


        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12 text-center"
        >

          <span
            className="mb-3 mt-2 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(6,182,212,0.12)",
              color: "#06b6d4",
              border: "1px solid rgba(6,182,212,0.25)",
            }}
          >
            Contact Us
          </span>


          <h1 className="text-4xl font-bold">
            Get in Touch with{" "}
            <span className="text-gradient">
              SkillPilot AI
            </span>
          </h1>


          <p
            className="mx-auto mt-4 max-w-xl text-sm"
            style={{
              color: "var(--color-muted)",
            }}
          >
            Have questions, feedback, or suggestions?
            Our team would love to hear from you.
          </p>

        </motion.div>



        {/* Content */}
        <div className="relative grid gap-8 md:grid-cols-2 mb-5">


          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border p-8"
            style={{
              borderColor: "rgba(99,102,241,0.15)",
              background: "rgba(255,255,255,0.02)",
            }}
          >

            <h2 className="mb-6 text-2xl font-bold">
              Contact Information
            </h2>


            <div className="space-y-5">


              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-4"
              >

                <div className="rounded-xl bg-primary/10 p-3">
                  <Mail className="text-primary" size={22} />
                </div>

                <div>
                  <p className="text-sm text-default-400">
                    Email
                  </p>

                  <p className="font-medium">
                    support@skillpilot.ai
                  </p>
                </div>

              </motion.div>



              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-4"
              >

                <div className="rounded-xl bg-primary/10 p-3">
                  <MapPin className="text-primary" size={22} />
                </div>

                <div>
                  <p className="text-sm text-default-400">
                    Location
                  </p>

                  <p className="font-medium">
                    Dhaka, Bangladesh
                  </p>
                </div>

              </motion.div>



              <div className="flex gap-3 pt-4">

                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="https://github.com/israt022"
                  target="_blank"
                  className="rounded-xl border p-3 transition hover:border-primary"
                >
                  <FaGithub size={20} />
                </motion.a>


                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="rounded-xl border p-3 transition hover:border-primary"
                >
                  <FaLinkedin size={20} />
                </motion.a>

              </div>

            </div>

          </motion.div>




          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border p-8"
            style={{
              borderColor: "rgba(99,102,241,0.15)",
              background: "rgba(255,255,255,0.02)",
            }}
          >

            <h2 className="mb-6 text-2xl font-bold">
              Send Message
            </h2>


            <form className="space-y-4">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl border border-default-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
              />


              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-xl border border-default-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
              />


              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full rounded-xl border border-default-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
              />


              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white transition hover:bg-primary/90"
              >
                <Send size={18} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}