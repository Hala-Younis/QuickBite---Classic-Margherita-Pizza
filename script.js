document.addEventListener('DOMContentLoaded', () => {
    // Get button elements
    const saveButton = document.getElementById('saveRecipe');
    const printButton = document.getElementById('printRecipe');
    const shareButton = document.getElementById('shareRecipe');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    const zoomBtn = document.querySelector('.zoom-btn');
    const recipeImage = document.querySelector('.recipe-image img');

    // Save recipe functionality
    saveButton.addEventListener('click', () => {
        saveButton.classList.add('clicked');
        
        // Simulate saving with animation
        setTimeout(() => {
            const saved = localStorage.getItem('savedRecipes');
            const recipes = saved ? JSON.parse(saved) : [];
            
            if (!recipes.includes('Margherita Pizza')) {
                recipes.push('Margherita Pizza');
                localStorage.setItem('savedRecipes', JSON.stringify(recipes));
                showNotification('Recipe saved to your favorites!', 'success');
            } else {
                showNotification('Recipe already saved!', 'info');
            }
            
            saveButton.classList.remove('clicked');
        }, 300);
    });

    // Print recipe functionality
    printButton.addEventListener('click', () => {
        printButton.classList.add('clicked');
        setTimeout(() => {
            window.print();
            printButton.classList.remove('clicked');
        }, 300);
    });

    // Share recipe functionality
    shareButton.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'Classic Margherita Pizza Recipe',
                text: 'Check out this delicious Margherita Pizza recipe!',
                url: window.location.href
            })
            .catch(error => console.log('Error sharing:', error));
        } else {
            // Fallback for browsers that don't support Web Share API
            const dummy = document.createElement('input');
            document.body.appendChild(dummy);
            dummy.value = window.location.href;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            showNotification('Link copied to clipboard!', 'success');
        }
    });

    // Image zoom functionality
    zoomBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = recipeImage.src;
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Ingredients checklist functionality
    const checkboxes = document.querySelectorAll('.ingredients-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            if (allChecked) {
                showNotification('All ingredients gathered! Time to cook! 🍕', 'success');
            }
        });
    });

    // Step highlighting functionality
    const steps = document.querySelectorAll('.step-content');
    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            steps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
            showNotification(`Step ${index + 1} selected`, 'info');
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add fade-in animation for content
    const fadeElements = document.querySelectorAll('.recipe-content > section');
    fadeElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}); 