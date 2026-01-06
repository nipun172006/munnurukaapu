/**
 * Community Information Registry - Client-side JavaScript
 * Handles form submission, validation, and admin functionality
 */

// API Base URL is configured in config.js
// Access it via window.API_BASE_URL (set by config.js)

// Admin authentication token
let adminToken = null;

// ===== FORM HANDLING =====

/**
 * Initialize form event listeners
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const adminLoginForm = document.getElementById('adminLoginForm');

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }

    // Keyboard shortcut to reveal admin button (Ctrl+Shift+A)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            document.getElementById('adminAccessBtn').style.display = 'block';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    // Disable submit button and show loader
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';

    // Collect form data
    const formData = {
        surname: form.surname.value.trim(),
        name: form.name.value.trim(),
        gender: form.gender.value,
        age: parseInt(form.age.value),
        mobileNumber: form.mobileNumber.value.trim(),
        gmailId: form.gmailId.value.trim(),
        aadharNumber: form.aadharNumber.value.trim(),
        village: form.village.value.trim(),
        occupation: form.occupation.value,
        notes: form.notes.value.trim()
    };

    // Validate mobile number
    if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
        showError('Please enter a valid 10-digit mobile number');
        resetSubmitButton(submitBtn, btnText, btnLoader);
        return;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.gmailId)) {
        showError('Please enter a valid email address');
        resetSubmitButton(submitBtn, btnText, btnLoader);
        return;
    }

    // Validate Aadhar number
    if (!/^[0-9]{12}$/.test(formData.aadharNumber)) {
        showError('Please enter a valid 12-digit Aadhar number');
        resetSubmitButton(submitBtn, btnText, btnLoader);
        return;
    }

    // Validate age
    if (formData.age < 0 || formData.age > 150) {
        showError('Please enter a valid age');
        resetSubmitButton(submitBtn, btnText, btnLoader);
        return;
    }

    try {
        const response = await fetch(`${window.API_BASE_URL}/api/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Show success message
            showSuccess();
            form.reset();
        } else {
            // Show error message
            const errorMsg = data.errors ? data.errors.join(', ') : data.message;
            showError(errorMsg);
        }
    } catch (error) {
        console.error('Submission error:', error);
        showError('Network error. Please check your connection and try again.');
    } finally {
        resetSubmitButton(submitBtn, btnText, btnLoader);
    }
}

/**
 * Reset submit button state
 */
function resetSubmitButton(btn, textEl, loaderEl) {
    btn.disabled = false;
    textEl.style.display = 'inline';
    loaderEl.style.display = 'none';
}

/**
 * Show success message
 */
function showSuccess() {
    const form = document.getElementById('registrationForm');
    const successMsg = document.getElementById('successMessage');

    form.style.display = 'none';
    successMsg.style.display = 'block';

    // Scroll to success message
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Show error message
 */
function showError(message) {
    const errorMsg = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    errorText.textContent = message;
    errorMsg.style.display = 'block';

    // Scroll to error message
    errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

/**
 * Hide error message
 */
function hideError() {
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.style.display = 'none';
}

/**
 * Reset form and show it again
 */
function resetForm() {
    const form = document.getElementById('registrationForm');
    const successMsg = document.getElementById('successMessage');

    form.style.display = 'grid';
    successMsg.style.display = 'none';

    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== ADMIN FUNCTIONALITY =====

/**
 * Toggle admin section visibility
 */
function toggleAdmin() {
    const adminSection = document.getElementById('admin');
    const isVisible = adminSection.style.display !== 'none';

    if (isVisible) {
        adminSection.style.display = 'none';
    } else {
        adminSection.style.display = 'block';
        adminSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Handle admin login
 */
async function handleAdminLogin(e) {
    e.preventDefault();

    const form = e.target;
    const username = form.querySelector('#adminUsername').value;
    const password = form.querySelector('#adminPassword').value;

    try {
        const response = await fetch(`${window.API_BASE_URL}/api/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            adminToken = data.token;
            showAdminControls();
            loadStats();
        } else {
            alert('Invalid credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
}

/**
 * Show admin controls after successful login
 */
function showAdminControls() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminControls').style.display = 'block';
    loadMembers(); // Load members table
}

/**
 * Load and display statistics
 */
async function loadStats() {
    try {
        const response = await fetch(`${window.API_BASE_URL}/api/admin/stats`, {
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });

        const data = await response.json();

        if (response.ok && data.success) {
            const statsContainer = document.getElementById('statsContainer');

            let statsHTML = `<p><strong>Total Members:</strong> ${data.data.totalMembers}</p>`;
            statsHTML += '<p><strong>By Occupation:</strong></p><ul>';

            data.data.occupationStats.forEach(stat => {
                statsHTML += `<li>${stat._id}: ${stat.count}</li>`;
            });

            statsHTML += '</ul>';
            statsContainer.innerHTML = statsHTML;
        }
    } catch (error) {
        console.error('Stats error:', error);
    }
}

/**
 * Download data as CSV
 */
async function downloadCSV() {
    try {
        const response = await fetch(`${window.API_BASE_URL}/api/admin/export`, {
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `community-data-${Date.now()}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            alert('Data downloaded successfully!');
        } else {
            alert('Failed to download data');
        }
    } catch (error) {
        console.error('Download error:', error);
        alert('Download failed. Please try again.');
    }
}

/**
 * Logout admin
 */
function logout() {
    adminToken = null;
    document.getElementById('adminLogin').style.display = 'block';
    document.getElementById('adminControls').style.display = 'none';
    document.getElementById('adminLoginForm').reset();
    toggleAdmin();
}

// ===== FORM VALIDATION ENHANCEMENTS =====

/**
 * Real-time mobile number validation
 */
const mobileInput = document.getElementById('mobileNumber');
if (mobileInput) {
    mobileInput.addEventListener('input', (e) => {
        // Remove non-digit characters
        e.target.value = e.target.value.replace(/\D/g, '');

        // Limit to 10 digits
        if (e.target.value.length > 10) {
            e.target.value = e.target.value.slice(0, 10);
        }
    });
}

/**
 * Real-time age validation
 */
const ageInput = document.getElementById('age');
if (ageInput) {
    ageInput.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);

        if (value < 0) {
            e.target.value = 0;
        } else if (value > 150) {
            e.target.value = 150;
        }
    });
}

/**
 * Real-time Aadhar number validation
 */
const aadharInput = document.getElementById('aadharNumber');
if (aadharInput) {
    aadharInput.addEventListener('input', (e) => {
        // Remove non-digit characters
        e.target.value = e.target.value.replace(/\D/g, '');

        // Limit to 12 digits
        if (e.target.value.length > 12) {
            e.target.value = e.target.value.slice(0, 12);
        }
    });
}

/**
 * Form field animations on focus
 */
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ===== PASSWORD VISIBILITY TOGGLE =====

/**
 * Toggle password visibility in admin login
 */
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('adminPassword');
    const toggleIcon = document.getElementById('togglePasswordIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.textContent = '🙈'; // Hide icon
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = '👁️'; // Show icon
    }
}

// ===== ADMIN MEMBERS TABLE =====

// Store all members globally for filtering
let allMembers = [];

/**
 * Load all members from API
 */
async function loadMembers() {
    try {
        const response = await fetch(`${window.API_BASE_URL}/api/admin/members`, {
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });

        const data = await response.json();

        if (response.ok && data.success) {
            allMembers = data.data;
            displayMembers(allMembers);
        } else {
            console.error('Failed to load members');
            document.getElementById('membersTableBody').innerHTML = `
                <tr>
                    <td colspan="12" style="text-align: center; padding: 2rem; color: var(--color-error);">
                        Failed to load members. Please try again.
                    </td>
                </tr>
            `;
        }
    } catch (error) {
        console.error('Load members error:', error);
        document.getElementById('membersTableBody').innerHTML = `
            <tr>
                <td colspan="12" style="text-align: center; padding: 2rem; color: var(--color-error);">
                    Error loading members. Please refresh the page.
                </td>
            </tr>
        `;
    }
}

/**
 * Display members in the table
 */
function displayMembers(members) {
    const tbody = document.getElementById('membersTableBody');
    const memberCount = document.getElementById('memberCount');

    if (members.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="12" style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">
                    No members found.
                </td>
            </tr>
        `;
        memberCount.textContent = '';
        return;
    }

    let html = '';
    members.forEach((member, index) => {
        const submittedDate = new Date(member.submittedAt).toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        html += `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${member.surname}</strong></td>
                <td>${member.name}</td>
                <td>${member.gender}</td>
                <td>${member.age}</td>
                <td>${member.mobileNumber}</td>
                <td>${member.gmailId}</td>
                <td>${member.aadharNumber}</td>
                <td>${member.village}</td>
                <td>${member.occupation}</td>
                <td>${member.notes || '-'}</td>
                <td style="font-size: 0.8rem;">${submittedDate}</td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
    memberCount.textContent = `Showing ${members.length} member${members.length !== 1 ? 's' : ''}`;
}

/**
 * Filter members based on search input
 */
function filterMembers() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        displayMembers(allMembers);
        return;
    }

    const filteredMembers = allMembers.filter(member => {
        return (
            member.surname.toLowerCase().includes(searchTerm) ||
            member.name.toLowerCase().includes(searchTerm) ||
            member.village.toLowerCase().includes(searchTerm) ||
            member.mobileNumber.includes(searchTerm) ||
            member.gmailId.toLowerCase().includes(searchTerm) ||
            member.occupation.toLowerCase().includes(searchTerm)
        );
    });

    displayMembers(filteredMembers);
}
