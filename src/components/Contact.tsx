/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, Github, Linkedin, ExternalLink, Send } from 'lucide-react';
import { SiGmail } from 'react-icons/si';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'zuhaibalid@gmail.com',
    link: 'https://mail.google.com/mail/?view=cm&fs=1&to=zuhaibalid@gmail.com&su=Contact%20Request&body=Hello%20Zuhaib',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '03493237141',
    link: 'https://wa.me/923493237141',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Shahrah-e-Faisal, Karachi',
    link: null,
  },
];

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    value: '@DotZohaib',
    link: 'https://github.com/DotZohaib',
    color: 'hover:text-foreground',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Zohaib Ali Dayo',
    link: 'https://www.linkedin.com/in/zohaib-ali-dayo-7862261b5/',
    color: 'hover:text-chart-1',
  },
  {
    icon: ExternalLink,
    label: 'WhatsApp ',
    value: '+92 349 3237141',
    link: 'https://wa.me/+923493237141',
    color: 'hover:text-chart-2',
  },
  {
    icon: ExternalLink,
    label: 'Academy',
    value: 'codewithzuhaib.vercel.app',
    link: 'https://codewithzuhaib.vercel.app',
    color: 'hover:text-chart-3',
  },
];

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-3/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Get In <span className="gradient-text-primary">Touch</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Let&apos;s collaborate on innovative projects or discuss opportunities
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="p-8 glass-morphism" data-testid="card-contact-info">
              <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Contact Information
              </h3>
              <div className="space-y-4" data-testid="list-contact-info">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-card/50 hover-elevate active-elevate-2 transition-all">
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{info.label}</div>
                        <div className="font-medium">{info.value}</div>
                      </div>
                    </div>
                  );

                  return info.link ? (
                    <a
                      key={index}
                      href={info.link}
                      className="block"
                      data-testid={`contact-${info.label.toLowerCase()}`}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={index} data-testid={`contact-${info.label.toLowerCase()}`}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-8 glass-morphism" data-testid="card-social-links">
              <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Connect on Social
              </h3>
              <div className="grid grid-cols-2 gap-4" data-testid="list-social-links">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 rounded-lg bg-card/50 hover-elevate active-elevate-2 transition-all group ${social.color}`}
                      data-testid={`social-${social.label.toLowerCase()}`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground">{social.label}</div>
                        <div className="text-sm font-medium truncate">{social.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 glass-morphism h-full flex flex-col justify-center" data-testid="card-contact-cta">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 mx-auto animate-pulse-glow">
                  <Send className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }} data-testid="text-contact-cta-title">
                    Ready to Start a Project?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-contact-cta-description">
                    I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=zuhaibalid@gmail.com&su=Contact%20Request&body=Hello%20Zuhaib" className="flex-1 sm:flex-initial">
                    <Button size="lg" className="w-full hover-elevate active-elevate-2" data-testid="button-send-email">
                      <Mail className="w-5 h-5 mr-2" />
                      Send Email
                    </Button>
                  </a>
                  <a href="https://www.linkedin.com/in/zohaib-ali-dayo-7862261b5/" target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-initial">
                    <Button size="lg" variant="outline" className="w-full glass-morphism hover-elevate active-elevate-2" data-testid="button-linkedin-message">
                      <Linkedin className="w-5 h-5 mr-2" />
                      LinkedIn
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
