document.addEventListener('DOMContentLoaded', () => {
    console.log('Rental Space Ojisan Blog initialized');

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Category Switching Logic
    const categoryTiles = document.querySelectorAll('.category-tile');
    const postContainers = document.querySelectorAll('.post-list-container');
    const sectionTitle = document.querySelector('.section-title-tab button');

    window.switchCategory = function (categoryId, categoryName) {
        // Update tiles active state? (Optional, maybe just visual feedback)

        // Hide all containers
        postContainers.forEach(container => {
            container.classList.remove('active');
        });

        // Show targeted container
        const targetContainer = document.getElementById(`posts-${categoryId}`);
        if (targetContainer) {
            targetContainer.classList.add('active');

            // Update section title text
            if (sectionTitle) {
                sectionTitle.innerText = categoryName;
            }

            // Scroll to posts? (Optional)
            const listTop = document.querySelector('.latest-posts').offsetTop - 50;
            window.scrollTo({ top: listTop, behavior: 'smooth' });
        }
    };

    // Share Functions
    window.shareOnX = function () {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        window.open(`https://twitter.com/share?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
    };

    window.shareOnThreads = function () {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        window.open(`https://www.threads.net/intent/post?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
    };

    window.shareOnLine = function () {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://social-plugins.line.me/lineit/share?url=${url}`, '_blank', 'width=600,height=400');
    };

    window.copyToClipboard = function () {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            const btn = document.querySelector('.share-btn.copy');
            const originalHtml = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.classList.add('copied');

            // Simple toast or feedback
            const toast = document.createElement('div');
            toast.className = 'share-toast';
            toast.innerText = 'リンクをコピーしました';
            document.body.appendChild(toast);

            setTimeout(() => {
                btn.innerHTML = originalHtml;
                btn.classList.remove('copied');
                toast.classList.add('fade-out');
                setTimeout(() => toast.remove(), 500);
            }, 2000);
        }).catch(err => {
            console.error('Copy failed', err);
        });
    };
});
