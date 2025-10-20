// This script expects the access_token in the URL hash
const form = document.getElementById('resetForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  message.textContent = '';
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;
  if (!password || !confirm) {
    message.textContent = 'Please fill all fields.';
    return;
  }
  if (password !== confirm) {
    message.textContent = 'Passwords do not match.';
    return;
  }
  // Get access_token from URL hash
  const token = window.location.hash.match(/access_token=([^&]+)/)?.[1];
  if (!token) {
    message.textContent = 'Invalid or missing token.';
    return;
  }
  // Call Supabase REST API to update password
  try {
    const res = await fetch('https://gczoakupibhzaeplstzh.supabase.co/auth/v1/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ password })
    });
    const result = await res.json();
    if (res.ok) {
      message.style.color = '#22c55e';
      message.textContent = 'Password reset successful! You can now log in.';
      form.reset();
    } else {
      message.textContent = result.error_description || result.error || 'Reset failed.';
    }
  } catch (err) {
    message.textContent = 'Unexpected error: ' + err.message;
  }
});
