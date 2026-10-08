import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const form = document.querySelector('#apl-sign-in-form');
const card = document.querySelector('.apl-auth-card');
const wrap = document.querySelector('.apl-auth-card-wrap');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const remember = form.elements.remember;
const submit = form.querySelector('.apl-auth-submit');
const status = document.querySelector('.apl-auth-status');
const title = document.querySelector('#sign-in-title');
const subtitle = document.querySelector('#apl-auth-subtitle');
const modeCopy = document.querySelector('#apl-auth-mode-copy');
const modeButton = document.querySelector('#apl-auth-mode');
const toggle = document.querySelector('.apl-password-toggle');
let mode = 'sign-in';

const authStorage = {
  getItem: (key) => (remember.checked ? localStorage : sessionStorage).getItem(key),
  setItem: (key, value) => (remember.checked ? localStorage : sessionStorage).setItem(key, value),
  removeItem: (key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }
};

const supabase = createClient(
  'https://oyzyeifwtbzyxyukvgia.supabase.co',
  'sb_publishable__K8MPJ_kFlyRhPzS___wOQ_NM3xuxMK',
  { auth: { storage: authStorage, persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);

const setStatus = (message, state = '') => {
  status.textContent = message;
  status.dataset.state = state;
};

const setBusy = (busy, label) => {
  form.setAttribute('aria-busy', String(busy));
  submit.disabled = busy;
  submit.innerHTML = busy
    ? `<span class="apl-spinner" aria-hidden="true"></span><span>${label}</span>`
    : `<span>${mode === 'sign-up' ? 'Create account' : 'Sign in'}</span><span aria-hidden="true">→</span>`;
};

const setMode = (nextMode) => {
  mode = nextMode;
  const signingUp = mode === 'sign-up';
  title.textContent = signingUp ? 'Create your account' : 'Welcome back';
  subtitle.textContent = signingUp ? 'Set up secure access to MyAPL' : 'Sign in to continue to MyAPL';
  password.autocomplete = signingUp ? 'new-password' : 'current-password';
  modeCopy.textContent = signingUp ? 'Already have an account?' : 'Don’t have an account?';
  modeButton.textContent = signingUp ? 'Sign in' : 'Create one';
  document.querySelector('.apl-auth-options').hidden = signingUp;
  setStatus('');
  setBusy(false);
};

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  wrap.addEventListener('pointermove', (event) => {
    const box = wrap.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - .5;
    const y = (event.clientY - box.top) / box.height - .5;
    card.style.transform = `rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  });
  wrap.addEventListener('pointerleave', () => card.style.transform = '');
}

toggle.addEventListener('click', () => {
  const showing = password.type === 'text';
  password.type = showing ? 'password' : 'text';
  toggle.setAttribute('aria-pressed', String(!showing));
  toggle.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
});

modeButton.addEventListener('click', () => setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in'));

document.querySelector('#apl-forgot-password').addEventListener('click', async () => {
  if (!email.reportValidity()) return;
  setStatus('Sending password reset link…');
  const { error } = await supabase.auth.resetPasswordForEmail(email.value.trim(), {
    redirectTo: `${location.origin}/sign-in.html`
  });
  setStatus(error ? error.message : 'Check your email for the password reset link.', error ? 'error' : 'success');
});

document.querySelector('#apl-google-sign-in').addEventListener('click', async () => {
  setStatus('Opening Google sign-in…');
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${location.origin}/sign-in.html` }
  });
  if (error) setStatus(error.message, 'error');
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const signingUp = mode === 'sign-up';
  setStatus('');
  setBusy(true, signingUp ? 'Creating account…' : 'Signing in…');

  const credentials = { email: email.value.trim(), password: password.value };
  const { data, error } = signingUp
    ? await supabase.auth.signUp({
        ...credentials,
        options: { emailRedirectTo: `${location.origin}/sign-in.html` }
      })
    : await supabase.auth.signInWithPassword(credentials);

  setBusy(false);
  if (error) {
    setStatus(error.message, 'error');
    return;
  }

  if (signingUp && !data.session) {
    setStatus('Account created. Check your email to confirm your address.', 'success');
    return;
  }

  setStatus(`Signed in as ${data.user.email}.`, 'success');
});

supabase.auth.getSession().then(({ data }) => {
  if (data.session?.user?.email) setStatus(`Signed in as ${data.session.user.email}.`, 'success');
});
