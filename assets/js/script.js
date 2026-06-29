        // Preloader transition & Boot Particle Engine
           // Preloader transition & Boot Particle Engine
    window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');

        if (preloader) {
            preloader.style.opacity = '0';

            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 600);

    initParticles();
});

const slides = document.querySelectorAll('.hero-slide-right');

if (slides.length > 0) {
    let current = 0;

    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 3000);
}

        // Background Dynamic Particles engine (excludes Hero section)
        function initParticles() {
           if (window.innerWidth < 1024) return;

    const icons = [
        'fa-tooth',
        'fa-tooth',
        'fa-tooth',
        'fa-tooth',
        'fa-heart-pulse',
        'fa-kit-medical',
        'fa-shield-halved',
        'fa-user-doctor',
        'fa-stethoscope',
        'fa-syringe',
        'fa-notes-medical',
        'fa-briefcase-medical',
        'fa-hospital-user',
        'fa-bandage',
        'fa-hand-sparkles',
        'fa-face-smile',
        'fa-star-of-life'
    ];

    const createParticles = (section) => {

        // Don't create twice
        if (section.querySelector('.particle-container')) return;

        const particleContainer = document.createElement('div');
        particleContainer.className =
            'particle-container absolute inset-0 overflow-hidden pointer-events-none z-0';

        // Hero gets more particles
        let particleCount;

if (window.innerWidth < 768) {
    particleCount = 0;          // Mobile
} else if (window.innerWidth < 1024) {
    particleCount = section.id === 'home' ? 8 : 5;   // Tablet
} else {
    particleCount = section.id === 'home' ? 18 : 10; // Desktop
}



        for (let i = 0; i < particleCount; i++) {

            const icon = document.createElement('i');

            const randomIcon =
                icons[Math.floor(Math.random() * icons.length)];

            icon.className =
                `fa-solid ${randomIcon} text-emerald-600/10 absolute`;

            icon.style.fontSize =
                `${Math.random() * 14 + 12}px`;

            icon.style.left =
                `${Math.random() * 100}%`;

            icon.style.top =
                `${Math.random() * 100}%`;

            icon.style.animation =
                `${Math.random() > 0.5 ? 'float-particle-1' : 'float-particle-2'}
                 ${15 + Math.random() * 15}s
                 infinite ease-in-out`;

            icon.style.animationDelay =
                `${-Math.random() * 20}s`;

            particleContainer.appendChild(icon);
        }

        section.insertBefore(
            particleContainer,
            section.firstChild
        );
    };

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                createParticles(entry.target);

                // Stop observing once particles are created
                observer.unobserve(entry.target);

            }

        });

    }, {
        root: null,
        threshold: 0.15
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });


        }


        // Sticky Nav shadow toggler & Scroll Progress Indicator calculation
        // Scrolling dynamics (Navbar + Back To Top)
        window.onscroll = function() {
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = (winScroll / height) * 100;
            // document.getElementById("myBar").style.width = scrolled + "%";

            const navbar = document.getElementById('navbar');
            const btt = document.getElementById('backToTop');
            
            if (winScroll > 40) {
                navbar.classList.add('shadow-xl', 'from-blue-950', 'to-sky-900', 'backdrop-blur-md');
                navbar.classList.remove('from-blue-900', 'to-sky-800', 'border-blue-700');
                btt.classList.remove('opacity-0', 'translate-y-10');
                btt.classList.add('opacity-100', 'translate-y-0');
            } else {
                navbar.classList.remove('shadow-xl', 'from-blue-950', 'to-sky-900', 'backdrop-blur-md');
                navbar.classList.add('from-blue-900', 'to-sky-800', 'border-blue-700');
                btt.classList.add('opacity-0', 'translate-y-10');
                btt.classList.remove('opacity-100', 'translate-y-0');
            }
        };

        // Mobile Menu toggles
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        function toggleMenu() {
            mobileMenu.classList.toggle('hidden');
            if(mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.replace('fa-xmark', 'fa-bars-staggered');
            } else {
                menuIcon.classList.replace('fa-bars-staggered', 'fa-xmark');
            }
        }

        menuBtn.addEventListener('click', toggleMenu);
        mobileLinks.forEach(link => { 
            link.addEventListener('click', () => { 
                mobileMenu.classList.add('hidden'); 
                menuIcon.classList.replace('fa-xmark', 'fa-bars-staggered');
            }); 
        });

        
        // Dedicated Hero Right-Side Image Slider
        const slidesRight = document.querySelectorAll('.hero-slide-right');
        const dotsRight = document.querySelectorAll('.hero-dot-right');
        let currentSlideRight = 0;
        let slideIntervalRight;

        function showSlideRight(index) {
            if(!slidesRight.length) return;
            slidesRight.forEach(s => s.classList.remove('active'));
            dotsRight.forEach(d => {
                d.className = 'w-2 h-2 rounded-full bg-slate-300 hover:bg-emerald-400 transition-all hero-dot-right cursor-pointer shadow-sm';
            });
            
            slidesRight[index].classList.add('active');
            if(dotsRight[index]) {
                dotsRight[index].className = 'w-6 h-2 rounded-full bg-emerald-500 transition-all hero-dot-right cursor-pointer shadow-sm';
            }
            currentSlideRight = index;
        }

        function nextSlideRight() { showSlideRight((currentSlideRight + 1) % slidesRight.length); }

        if(slidesRight.length > 0) {
            slideIntervalRight = setInterval(nextSlideRight, 3000); // 5 second relaxed pace
            dotsRight.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    clearInterval(slideIntervalRight);
                    showSlideRight(index);
                    slideIntervalRight = setInterval(nextSlideRight, 3000);
                });
            });
        }


        // Scroll reveal trigger check
        function checkScrollReveal() {
            let reveals = document.querySelectorAll(".reveal");
            for (let i = 0; i < reveals.length; i++) {
                let windowHeight = window.innerHeight;
                let elementTop = reveals[i].getBoundingClientRect().top;
                if (elementTop < windowHeight - 40) { reveals[i].classList.add("active"); }
            }
        }
        window.addEventListener("scroll", checkScrollReveal);
        checkScrollReveal();

        // Stats Counters Animation Setup
        const counters = document.querySelectorAll('.counter');
        if('IntersectionObserver' in window) {
            const counterObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        const counter = entry.target;
                        const target = +counter.getAttribute('data-target');
                        const stepValue = target / 100; 
                        
                        const iterate = () => {
                            const current = +counter.innerText;
                            if(current < target) {
                                counter.innerText = Math.ceil(current + stepValue);
                                setTimeout(iterate, 20);
                            } else { counter.innerText = target; }
                        };
                        iterate();
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });
            counters.forEach(c => counterObserver.observe(c));
        }

        // Testimonials Feedback Dataset configuration
        const reviewsDataset = [
            { name: "Jaya Rani", text: "RASTOGI DENTAL CLINIC offers excellent service with modern facilities. The staff is friendly, and hygiene is top-notch. I can confidently say it’s the best dental clinic in Varanasi. Anyone searching for a good dental clinic in Varanasi should visit here.", time: "6 months ago" },
            { name: "Mahi Sagar", text: "Painless, affordable, and effective treatments—RASTOGI DENTAL CLINIC is the best dental clinic in Varanasi.", time: "6 months ago" },
            { name: "Rajat Pal", text: "RASTOGI DENTAL CLINIC is the best dental clinic in Varanasi—professional, clean, and highly reliable.", time: "6 months ago" },
            { name: "shashi shankar patel", text: "If you want quality treatment, RASTOGI DENTAL CLINIC is the best dental clinic in Varanasi.", time: "6 months ago" },
            { name: "Ayushi Gupta", text: "The best dental care I have ever experienced! Professional, courteous, and friendly staff…and cleanliness is maintained at its best. would highly recommend to anyone", time: "4 years ago" },
            { name: "Komal Singh", text: "One of the best dental clinic in whole area. Friendly staff & doctor. Best treatments along with affordable price.", time: "5 years ago" },
            { name: "Deepika Yadav", text: "Best dental clinic in our district and doctor vipul also a good person", time: "3 years ago" },
            { name: "Rohit Kumar", text: "Really affordable clinic. They have a lot of experience about dental procedures.", time: "5 years ago" },
            { name: "Dr.Amit Chauhan", text: "Very good in all dental procedures and very good behavior.", time: "4 years ago" }
        ];

        const trackElement = document.getElementById('testimonial-track');
        if(trackElement) {
            // Duplicate array natively to establish a seamless continuous loop
            const loopSet = [...reviewsDataset, ...reviewsDataset];

            loopSet.forEach(item => {
                const block = document.createElement('div');
                block.className = "flex-none w-full md:w-1/2 lg:w-1/3 px-3 sm:px-4 py-2";
                block.innerHTML = `
                    <div class="glass-card p-6 sm:p-8 rounded-3xl shadow-xl h-full flex flex-col justify-between font-sans transition-transform hover:-translate-y-1 duration-300 relative z-10">
                        <div>
                            <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-md shrink-0">${item.name.charAt(0).toUpperCase()}</div>
                                <div class="overflow-hidden">
                                    <h4 class="font-bold text-slate-900 text-sm sm:text-base truncate">${item.name}</h4>
                                    <p class="text-[10px] sm:text-xs text-slate-600 font-medium mt-0.5">${item.time}</p>
                                </div>
                            </div>
                            <div class="flex text-yellow-500 text-xs sm:text-sm gap-1 mb-4 drop-shadow-sm">
                                <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                            </div>
                            <p class="text-slate-800 font-medium text-xs sm:text-sm italic leading-relaxed">"${item.text}"</p>
                        </div>
                        <div class="mt-5 pt-4 border-t border-emerald-200/50 text-[9px] sm:text-[10px] tracking-widest font-bold text-emerald-700 flex items-center gap-1.5 uppercase"><i class="fa-brands fa-google text-blue-600 text-xs sm:text-sm"></i> Verified Review</div>
                    </div>
                `;
                trackElement.appendChild(block);
            });

            let currentSlideOffset = 0;
            setInterval(() => {
                currentSlideOffset++;
                if (currentSlideOffset > reviewsDataset.length) {
                    trackElement.style.transition = 'none';
                    currentSlideOffset = 0;
                    trackElement.style.transform = `translateX(0)`;
                    // Force reflow
                    void trackElement.offsetWidth;
                    setTimeout(() => {
                        trackElement.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        currentSlideOffset++;
                        let countToShow = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
                        trackElement.style.transform = `translateX(-${currentSlideOffset * (100 / countToShow)}%)`;
                    }, 50);
                } else {
                    let countToShow = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
                    trackElement.style.transform = `translateX(-${currentSlideOffset * (100 / countToShow)}%)`;
                }
            }, 3500);
        }

        // Custom notification trigger mechanism replacing old alert() loops
        function showToastMessage(msg) {
            const toast = document.getElementById('custom-toast');
            const text = document.getElementById('custom-toast-message');
            text.innerText = msg;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3500);
        }

        // Clip text clipboard routing helper
        function copyToClipboard(text) {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(() => {
                    showToastMessage("UPI ID copied successfully to clipboard!");
                });
            } else {
                // Fallback for older browsers or non-secure contexts
                const tempInput = document.createElement("input");
                tempInput.value = text;
                document.body.appendChild(tempInput);
                tempInput.select();
                try {
                    document.execCommand("copy");
                    showToastMessage("UPI ID copied successfully to clipboard!");
                } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                }
                document.body.removeChild(tempInput);
            }
        }

        // Dynamic UPI Generation Logic
        function generateUPI() {
            const amountInput = document.getElementById('upi-amount').value;
            const upiID = "rastogidental@upi"; 
            const businessName = "RASTOGI DENTAL CLINIC";

            if (!amountInput || amountInput <= 0) {
                showToastMessage("Please enter a valid amount.");
                return;
            }

            // Create the standard UPI Intent URL
            const upiString = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(businessName)}&am=${amountInput}&cu=INR`;

            // 1. Hide Generate button, show the Payment Options container
            document.getElementById('generate-btn').style.display = 'none';
            const paymentOptions = document.getElementById('payment-options');
            paymentOptions.classList.remove('hidden');
            paymentOptions.classList.add('block');

            // 2. Generate and set the QR Code
            const qrImage = document.getElementById('upi-qr');
            qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiString)}`;

            // 3. Set the Direct App Link
            const payLink = document.getElementById('upi-link');
            payLink.href = upiString;
            
            showToastMessage("Payment gateway generated successfully!");
        }

        // WhatsApp Form API Routing
        function routeWhatsApp(num, label) {
            const name = document.getElementById('waName').value.trim();
            const phone = document.getElementById('waPhone').value.trim();
            const date = document.getElementById('waDate').value;
            const selection = document.getElementById('waType').value;
            const history = document.getElementById('waMessage').value.trim();

            if (!name || !phone || !date || !history) {
                showToastMessage("Please fill in all mandatory inputs (*) inside the booking form.");
                return;
            }

            const cleanString = `Hello RASTOGI DENTAL CLINIC (${label} Branch Queue Request),%0A%0A*PATIENT DATA:*%0A- Full Name: ${encodeURIComponent(name)}%0A- Contact Phone: ${encodeURIComponent(phone)}%0A- Requested Date: ${encodeURIComponent(date)}%0A- Procedure: ${encodeURIComponent(selection)}%0A%0A*CASE SUMMARY:*%0A${encodeURIComponent(history)}`;
            window.open(`https://wa.me/91${num}?text=${cleanString}`, '_blank');
        }

        // Webhook dispatcher logic
        function triggerWebhookDispatch() {
            const payload = {
                clinic: "RASTOGI DENTAL CLINIC",
                name: document.getElementById('waName').value,
                phone: document.getElementById('waPhone').value,
                email: document.getElementById('waEmail').value,
                date: document.getElementById('waDate').value,
                procedure: document.getElementById('waType').value,
                notes: document.getElementById('waMessage').value,
                timestamp: new Date().toISOString()
            };

            fetch('WEBHOOK_URL_PLACEHOLDER', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).then(() => {
                showToastMessage("Intake logged. Select Varanasi or Chunar to route to WhatsApp.");
            }).catch(() => {
                console.warn("Direct backup webhook channel currently unlinked. Procedural execution falls back to WhatsApp routing.");
            });
        }

        // Advanced AI Chatbot Knowledge Engine Configuration
        const chatToggle = document.getElementById('chatToggle');
        const chatWin = document.getElementById('chatbot-window');
        const chatClose = document.getElementById('chatClose');
        const chatInput = document.getElementById('chatInput');
        const chatSend = document.getElementById('chatSend');
        const chatBody = document.getElementById('chatBody');

        chatToggle.addEventListener('click', () => { 
            chatWin.classList.add('open'); 
            chatToggle.style.opacity = '0';
            setTimeout(() => { chatToggle.style.display = 'none'; }, 300);
            setTimeout(() => { chatInput.focus(); }, 400);
        });
        
        chatClose.addEventListener('click', () => { 
            chatWin.classList.remove('open'); 
            chatToggle.style.display = 'flex';
            setTimeout(() => { chatToggle.style.opacity = '1'; }, 50);
        });

        // Advanced Multi-Keyword Search Array
        const knowledgeBase = [
            {
                keywords: ["time", "timing", "hour", "open", "close", "when", "sunday", "schedule", "opd", "days"],
                answer: "Our consultation hours for both branches are: Monday to Saturday from 10:00 AM – 2:00 PM and 5:00 PM – 7:00 PM. On Sundays, we are open for Morning OPD from 10:00 AM – 1:00 PM."
            },
            {
                keywords: ["location", "address", "where", "branch", "varanasi", "chunar", "map", "situated", "direction", "reach", "clinic"],
                answer: "We proudly operate two advanced branches. Varanasi Branch: 1st Floor, Kanchanpur Gate, Chunar Road, Bhikharipur (+91 7080853206). Chunar Branch: Rastogi Katara, Sarafa Bazaar Chowk, Chunar (+91 9839913206)."
            },
            {
                keywords: ["contact", "phone", "number", "call", "appointment", "book", "schedule", "mobile", "whatsapp", "reach"],
                answer: "To book an appointment or for inquiries, please call Varanasi: +91 7080853206 or Chunar: +91 9839913206. You can also securely use the WhatsApp booking form located in our Contact section."
            },
            {
                keywords: ["emergency", "urgent", "pain", "trauma", "bleeding", "toothache", "hurt", "broken"],
                answer: "For immediate emergency support, call RASTOGI DENTAL CLINIC directly at +91 7080853206 (Varanasi) or +91 9839913206 (Chunar). Our trauma team provides 24/7 priority emergency care."
            },
            {
                keywords: ["doctor", "specialist", "who", "dentist", "experience", "staff", "team", "expert"],
                answer: "Our principal experts are Dr. Vipul Rastogi (BDS, FAGE) and Dr. Tripti Rastogi (BDS, FAGE). Both are highly experienced specialists dedicated to providing top-tier, painless dental care."
            },
            {
                keywords: ["dr vipul", "vipul rastogi", "vipul"],
                answer: "Dr. Vipul Rastogi (BDS, FAGE) brings 17+ years of clinical expertise. He is a former observer at IMS BHU and a Life Member of the Indian Dental Association."
            },
            {
                keywords: ["dr tripti", "tripti rastogi", "tripti"],
                answer: "Dr. Tripti Rastogi (BDS, FAGE) is a highly skilled member of the Indian Dental Association. She focuses specifically on preventive, restorative, and compassionate family pediatric care."
            },
            {
                keywords: ["rct", "root canal", "painful", "endodontics", "nerve"],
                answer: "Modern Root Canal Treatments (RCT) at our clinic are virtually painless! We use advanced mechanical rotary systems and optimized local anesthesia for absolute comfort, often completed in a single sitting."
            },
            {
                keywords: ["implant", "screw", "titanium", "missing teeth", "replacement", "missing", "fake teeth"],
                answer: "We offer advanced bio-compatible titanium Dental Implants. They are completely safe, highly predictable, long-lasting, and structurally secure for permanently replacing missing teeth."
            },
            {
                keywords: ["braces", "aligner", "wire", "orthodontic", "crooked", "straighten", "invisalign", "teeth gap"],
                answer: "We provide comprehensive orthodontics to perfectly straighten your teeth, including traditional Metal Braces, cosmetic Ceramic Braces, and Advanced Clear Aligners."
            },
            {
                keywords: ["whitening", "cosmetic", "smile", "veneer", "laminate", "yellow", "stain", "bleaching"],
                answer: "We offer premium Cosmetic Dentistry, including Professional Teeth Whitening, Complete Smile Designing, and Dental Veneers/Laminates to give you a flawless, bright smile."
            },
            {
                keywords: ["crown", "bridge", "denture", "filling", "cap", "rehabilitation", "broken tooth"],
                answer: "We provide high-quality Restorative Dentistry, including Ceramic Dental Crowns (Caps), Fixed Bridges, Complete/Removable Dentures, Tooth-colored Fillings, and Full Mouth Rehabilitation."
            },
            {
                keywords: ["kid", "child", "pediatric", "children", "baby"],
                answer: "Our Pediatric Dentistry wing includes preventive care for children, interceptive orthodontics, sports mouth guards, and gentle sealants performed in a child-friendly, anxiety-free environment."
            },
            {
                keywords: ["clean", "scaling", "gum", "polishing", "bad breath", "plaque", "tartar", "smell", "bleeding gum"],
                answer: "We perform professional Dental Scaling and Polishing to treat gum disease, remove hard plaque/tartar buildup, cure bad breath, and ensure optimal oral hygiene."
            },
            {
                keywords: ["extract", "remove", "surgery", "wisdom", "pull"],
                answer: "We perform highly secure, painless surgical dental extractions, including complex wisdom teeth removal, strictly under optimized local anesthesia."
            },
            {
                keywords: ["cost", "price", "fee", "pay", "upi", "expensive", "charge", "afford", "amount"],
                answer: "We offer highly premium treatments at competitive, transparent, and affordable pricing for all budgets. You can pay securely via our clinic UPI ID: rastogidental@upi."
            },
            {
                keywords: ["about", "iso", "trust", "why", "mission", "vision", "hygiene", "sterilization", "safe", "cleanliness"],
                answer: "RASTOGI DENTAL CLINIC is an ISO 9001:2015 certified institution with 17+ years of experience and thousands of happy patients. We ensure strict multi-stage autoclave sterilization for 100% surgical safety."
            },
            {
                keywords: ["review", "instagram", "facebook", "social", "rating", "patient"],
                answer: "We hold a 4.9/5 star average rating from our satisfied patients! Connect with us on Instagram and Facebook to view real clinical results and treatment videos."
            },
            {
                keywords: ["service", "treatment", "offer", "do you do", "provide", "help"],
                answer: "Under one roof, we provide: RCT, Implants, Braces/Aligners, Teeth Whitening, Crowns/Bridges, Pediatric Care, Gum Treatments, Extractions, and 24/7 Emergency Dental Care."
            },
            {
                keywords: ["hello", "hi", "hey", "good morning", "good evening", "greetings"],
                answer: "Hello! Welcome to the RASTOGI DENTAL CLINIC interactive assistant. How can I help guide your clinical needs today?"
            },
            {
                keywords: ["thanks", "thank you", "ok", "okay", "great", "awesome"],
                answer: "You are most welcome! RASTOGI DENTAL CLINIC is proud to partner in your oral health journey. Have a great day!"
            }
        ];

        const fallbackResponse = "Thank you for reaching out to RASTOGI DENTAL CLINIC. For specific clinical diagnosis or to secure an appointment, please use the booking forms below to connect directly with our medical team over WhatsApp.";

        function sendChatInput() {
            const queryText = chatInput.value.trim().toLowerCase();
            if (!queryText) return;

            // Generate user message bubble
            const userMsg = document.createElement('div');
            userMsg.className = "chat-msg p-3 sm:p-3.5 rounded-2xl shadow-md max-w-[90%] text-xs sm:text-sm self-end bg-emerald-600 text-white rounded-tr-sm font-medium";
            userMsg.innerText = chatInput.value;
            chatBody.appendChild(userMsg);
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;

            // Advanced Array Matching Engine
            setTimeout(() => {
                let responseText = fallbackResponse;
                
                // Scan the knowledge base array for the first matching keyword
                for (let entry of knowledgeBase) {
                    // If the user's sentence includes ANY of the keywords in this entry's array
                    if (entry.keywords.some(kw => queryText.includes(kw))) {
                        responseText = entry.answer;
                        break;
                    }
                }
                
                const botMsg = document.createElement('div');
                botMsg.className = "chat-msg p-3 sm:p-3.5 rounded-2xl shadow-md max-w-[90%] text-xs sm:text-sm self-start bg-white border border-emerald-100 text-slate-800 font-medium rounded-tl-sm leading-relaxed";
                botMsg.innerHTML = responseText;
                chatBody.appendChild(botMsg);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 600);
        }

        chatSend.addEventListener('click', sendChatInput);
        chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChatInput(); });
    