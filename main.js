// Welcome Screen Animation (only on homepage)
function initWelcomeScreen() {
  const welcomeScreen = document.querySelector('.welcome-screen');

  if (welcomeScreen) {
    // Hide welcome screen after 4 seconds
    setTimeout(() => {
      welcomeScreen.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 4000);
  }
}

// Initialize welcome screen immediately
initWelcomeScreen();

document.addEventListener('DOMContentLoaded', function(){
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', ()=> mainNav.classList.toggle('open'))
  }

  // Simple contact form behavior: open mail client with filled content as a fallback.
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      if(!name || !email || !message){
        formStatus.textContent = 'Please complete all fields.';
        return;
      }
      const subject = encodeURIComponent('Website contact from ' + name);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      // open default mail client
      window.location.href = `mailto:hello@shuklaandco.in?subject=${subject}&body=${body}`;
      formStatus.textContent = 'Opening your email client...';
    })
  }
})
