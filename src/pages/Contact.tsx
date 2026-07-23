import { useState, type FormEvent } from 'react';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import SocialIcon from '../components/ui/SocialIcon';
import { CONTACT, SOCIALS } from '../data/socials';

export default function Contact() {
  const [sent, setSent] = useState(false);

  // Formulaire simple : compose un mailto pré-rempli (sans back-end).
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');

    const subject = encodeURIComponent(`Prise de contact — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <PageTransition>
      <section className="container-page py-16 md:py-24">
        <SectionHeading
          index="06"
          eyebrow="Contact"
          title={<>Travaillons<br />ensemble</>}
          className="mb-16 max-w-3xl"
        />

        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          {/* Coordonnées + réseaux */}
          <div className="space-y-10">
            <Reveal>
              <p className="tech-label mb-2">Email</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="link-underline font-display text-2xl md:text-3xl"
              >
                {CONTACT.email}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="btn-primary mt-6 block w-fit">
                ✉ Écrire un email
              </a>
            </Reveal>

            <Reveal>
              <p className="tech-label mb-2">Téléphone</p>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="text-lg text-ink/80 hover:text-signal">
                {CONTACT.phone}
              </a>
            </Reveal>

            <Reveal>
              <p className="tech-label mb-4">Réseaux & portfolios</p>
              <ul className="space-y-3">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center gap-4"
                    >
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center border border-line transition-colors duration-300 group-hover:border-signal group-hover:text-signal"
                        aria-hidden="true"
                      >
                        <SocialIcon path={s.icon} />
                      </span>
                      <span>
                        <span className="block font-mono text-sm text-ink transition-colors group-hover:text-signal">
                          {s.label}
                        </span>
                        <span className="block font-mono text-xs text-smoke">{s.handle}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Formulaire (risque créatif : gros champs typographiques) */}
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              <Field id="name" label="Votre nom" type="text" placeholder="Jean Dupont" required />
              <Field
                id="email"
                label="Votre email"
                type="email"
                placeholder="jean@entreprise.com"
                required
              />
              <div>
                <label htmlFor="message" className="tech-label mb-2 block">
                  Votre message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Bonjour Mattis, nous avons une opportunité d'alternance…"
                  className="w-full resize-none border-0 border-b-2 border-line bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-smoke/50 focus:border-signal"
                />
              </div>

              <button type="submit" className="btn-primary">
                Envoyer le message →
              </button>

              {sent && (
                <p role="status" className="font-mono text-sm text-signal">
                  → Votre logiciel de messagerie devrait s'ouvrir. Sinon, écrivez
                  directement à {CONTACT.email}.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}

/** Champ de formulaire réutilisable, style « ligne » minimaliste. */
function Field({
  id,
  label,
  type,
  placeholder,
  required,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="tech-label mb-2 block">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full border-0 border-b-2 border-line bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-smoke/50 focus:border-signal"
      />
    </div>
  );
}
