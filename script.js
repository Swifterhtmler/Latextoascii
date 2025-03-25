document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        const spans = menuToggle.querySelectorAll('span');
        
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    menuToggle.click();
                }
            }
        });
    });
    
    // FAQ accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // LaTeX to ASCII converter demo
    const latexInput = document.getElementById('latexInput');
    const asciiOutput = document.getElementById('asciiOutput');
    const convertBtn = document.getElementById('convertBtn');
    const copyBtn = document.getElementById('copyBtn');
    const exampleBtns = document.querySelectorAll('.example-btn');
    
    // Simple LaTeX to ASCII converter (simplified for demo purposes)
    function convertLatexToAscii(latex) {
        // This is a very simplified converter for demonstration
        // A real converter would be much more complex
        let ascii = latex;
        
        // Replace some common LaTeX commands with ASCII equivalents
        ascii = ascii.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)');
        ascii = ascii.replace(/\\sqrt\{([^{}]+)\}/g, 'sqrt($1)');
        ascii = ascii.replace(/\\sum_\{([^{}]+)\}\^\{([^{}]+)\}/g, 'sum_$1^$2');
        ascii = ascii.replace(/\\int_\{([^{}]+)\}\^\{([^{}]+)\}/g, 'int_$1^$2');
        ascii = ascii.replace(/\\alpha/g, 'alpha');
        ascii = ascii.replace(/\\beta/g, 'beta');
        ascii = ascii.replace(/\\gamma/g, 'gamma');
        ascii = ascii.replace(/\\delta/g, 'delta');
        ascii = ascii.replace(/\\theta/g, 'theta');
        ascii = ascii.replace(/\\pi/g, 'pi');
        ascii = ascii.replace(/\^2/g, '^2');
        ascii = ascii.replace(/\^3/g, '^3');
        ascii = ascii.replace(/\\pm/g, '±');
        ascii = ascii.replace(/\\cdot/g, '*');
        ascii = ascii.replace(/\\times/g, 'x');
        ascii = ascii.replace(/\\div/g, '/');
        ascii = ascii.replace(/\\infty/g, 'infinity');
        
        return ascii;
    }
    
    // Convert button click handler
    convertBtn.addEventListener('click', () => {
        const latex = latexInput.value.trim();
        if (latex) {
            const ascii = convertLatexToAscii(latex);
            asciiOutput.innerHTML = `<pre>${ascii}</pre>`;
        } else {
            asciiOutput.innerHTML = '<pre>Anna LaTeX kaava</pre>';
        }
    });
    
    // Copy button click handler
    copyBtn.addEventListener('click', () => {
        const ascii = asciiOutput.textContent.trim();
        if (ascii && ascii !== 'LaTeX kaava tulee näkyviin tähän' && ascii !== 'Anna LaTeX kaava') {
            navigator.clipboard.writeText(ascii).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                copyBtn.classList.add('btn-success');
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.classList.remove('btn-success');
                }, 2000);
            });
        }
    });
    
    // Example buttons click handlers
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const latex = btn.getAttribute('data-latex');
            latexInput.value = latex;
            convertBtn.click();
        });
    });
    
    // Download button click handler
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('This is a demo. In a real website, this would download the extension package.');
        });
    }
    
    // Add animation to feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    function checkScroll() {
        featureCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.8) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
});