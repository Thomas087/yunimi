<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
const route = useRoute()

// Navigation items
const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Features', href: '#features' },
  { label: 'About us', href: '#about' },
  { label: 'Contact', href: '#contact' }
]

// Mobile menu state
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

// Handle scroll to update navbar appearance
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Smart navigation: smooth scroll if on landing page, navigate otherwise
const navigateToSection = (href: string) => {
  const isOnLandingPage = route.path === '/'
  
  if (isOnLandingPage) {
    // If on landing page, smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  } else {
    // If on another page, navigate to landing page with section
    router.push(`/${href}`)
  }
  
  // Close mobile menu after navigation
  isMobileMenuOpen.value = false
}

// Handle Get Started button
const handleGetStarted = () => {
  router.push('/signup')
  // Ensure we scroll to top after navigation
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 100)
}

// Handle logo click - navigate to root and scroll to top
const handleLogoClick = () => {
  router.push('/')
  // Ensure we scroll to top after navigation
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 100)
}

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-brand" @click="handleLogoClick">
        <h2>Yunimi</h2>
      </div>

      <!-- Desktop Navigation -->
      <div class="navbar-nav desktop-nav">
        <a 
          v-for="item in navItems" 
          :key="item.href"
          :href="item.href"
          @click.prevent="navigateToSection(item.href)"
          class="nav-link"
        >
          {{ item.label }}
        </a>
      </div>

      <!-- Get Started Button -->
      <div class="navbar-actions">
        <Button 
          label="Get Started" 
          class="get-started-btn"
          @click="handleGetStarted"
        />
      </div>

      <!-- Mobile Menu Button -->
      <button 
        class="mobile-menu-btn"
        @click="toggleMobileMenu"
        :class="{ 'active': isMobileMenuOpen }"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Navigation Menu -->
    <div class="mobile-nav" :class="{ 'open': isMobileMenuOpen }">
      <div class="mobile-nav-content">
        <a 
          v-for="item in navItems" 
          :key="item.href"
          :href="item.href"
          @click.prevent="navigateToSection(item.href)"
          class="mobile-nav-link"
        >
          {{ item.label }}
        </a>
        <Button 
          label="Get Started" 
          class="mobile-get-started-btn"
          @click="handleGetStarted"
        />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.navbar-brand {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

.navbar-brand h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #667eea;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.navbar-actions {
  display: flex;
  align-items: center;
}

.get-started-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border: none !important;
  color: white !important;
  font-weight: 600 !important;
  padding: 0.75rem 1.5rem !important;
  border-radius: 25px !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
}

.get-started-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4) !important;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 4px;
}

.mobile-menu-btn span {
  width: 25px;
  height: 3px;
  background: #2c3e50;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.mobile-menu-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-nav.open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-nav-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.mobile-nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.mobile-nav-link:hover {
  color: #667eea;
}

.mobile-get-started-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border: none !important;
  color: white !important;
  font-weight: 600 !important;
  padding: 1rem 2rem !important;
  border-radius: 25px !important;
  width: 100%;
  max-width: 200px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar-container {
    padding: 0 1rem;
  }

  .desktop-nav {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .navbar-actions {
    display: none;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0 0.75rem;
  }

  .navbar-brand h2 {
    font-size: 1.25rem;
  }
}
</style>
