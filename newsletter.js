(function () {
  function createNewsletterSection() {
    if (document.getElementById("newsletter")) return;

    const section = document.createElement("section");
    section.id = "newsletter";
    section.innerHTML = `
      <div class="newsletter-card">
        <div>
          <p class="newsletter-kicker">Newsletter</p>
          <h2>Ricevi aggiornamenti su AI, genomica e vinificazione di precisione</h2>
          <p class="newsletter-copy">Una selezione essenziale di novità EnoGenAI, progetto pilota, ricerca e opportunità per cantine e partner.</p>
        </div>
        <form class="newsletter-form" name="newsletter" method="POST">
          <input type="hidden" name="form-name" value="newsletter" />
          <input type="text" name="bot-field" autocomplete="off" tabindex="-1" aria-hidden="true" class="newsletter-honeypot" />
          <input type="email" name="email" placeholder="La tua email" required />
          <input type="text" name="name" placeholder="Nome (opzionale)" />
          <input type="text" name="company" placeholder="Azienda / Cantina (opzionale)" />
          <button type="submit">Iscriviti</button>
          <p class="newsletter-note">Niente spam. Solo aggiornamenti rilevanti sul progetto.</p>
          <p class="newsletter-status" role="status" aria-live="polite"></p>
        </form>
      </div>
    `;

    const footer = document.querySelector("footer");
    if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(section, footer);
    } else {
      document.body.appendChild(section);
    }

    const form = section.querySelector("form");
    const status = section.querySelector(".newsletter-status");
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const data = new URLSearchParams(new FormData(form));
      status.textContent = "Invio in corso...";
      try {
        const response = await fetch("/newsletter-form.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: data.toString()
        });
        if (!response.ok) throw new Error("Submission failed");
        form.reset();
        status.textContent = "Grazie, iscrizione ricevuta.";
      } catch (error) {
        status.textContent = "Errore durante l'iscrizione. Riprova tra poco.";
      }
    });
  }

  function addStyles() {
    if (document.getElementById("newsletter-styles")) return;
    const style = document.createElement("style");
    style.id = "newsletter-styles";
    style.textContent = `
      #newsletter {
        background: hsl(282 32% 9%);
        border-top: 1px solid rgba(255,255,255,.08);
        padding: 5rem 1.5rem;
      }
      .newsletter-card {
        max-width: 1120px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(320px, .9fr);
        gap: 2rem;
        align-items: center;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 24px;
        background: linear-gradient(135deg, rgba(94,44,102,.36), rgba(20,15,40,.92));
        padding: clamp(1.5rem, 4vw, 3rem);
        box-shadow: 0 24px 80px rgba(0,0,0,.28);
      }
      .newsletter-kicker {
        color: hsl(40 70% 55%);
        font-size: .75rem;
        font-weight: 800;
        letter-spacing: .18em;
        margin: 0 0 .75rem;
        text-transform: uppercase;
      }
      .newsletter-card h2 {
        color: #fff;
        font-size: clamp(2rem, 5vw, 3.2rem);
        line-height: 1.05;
        margin: 0 0 1rem;
      }
      .newsletter-copy,
      .newsletter-note,
      .newsletter-status {
        color: rgba(255,255,255,.64);
      }
      .newsletter-copy {
        font-size: 1.05rem;
        line-height: 1.7;
        margin: 0;
      }
      .newsletter-form {
        display: grid;
        gap: .85rem;
      }
      .newsletter-form input {
        width: 100%;
        border: 1px solid rgba(255,255,255,.14);
        border-radius: 12px;
        background: rgba(255,255,255,.08);
        color: #fff;
        padding: .9rem 1rem;
        outline: none;
      }
      .newsletter-form input::placeholder {
        color: rgba(255,255,255,.45);
      }
      .newsletter-form button {
        border: 0;
        border-radius: 12px;
        background: hsl(40 70% 55%);
        color: #fff;
        cursor: pointer;
        font-weight: 800;
        padding: .95rem 1rem;
      }
      .newsletter-note,
      .newsletter-status {
        font-size: .8rem;
        margin: 0;
        text-align: center;
      }
      .newsletter-honeypot {
        display: none;
      }
      @media (max-width: 820px) {
        .newsletter-card {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function init() {
    addStyles();
    createNewsletterSection();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
