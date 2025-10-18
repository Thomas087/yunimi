import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import SignupPage from '../pages/SignupPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/#hero',
      name: 'landing-hero',
      component: LandingPage
    },
    {
      path: '/#features',
      name: 'landing-features',
      component: LandingPage
    },
    {
      path: '/#about',
      name: 'landing-about',
      component: LandingPage
    },
    {
      path: '/#contact',
      name: 'landing-contact',
      component: LandingPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage
    }
  ],
})

// Navigation guard to handle section scrolling
router.afterEach((to) => {
  if (to.path.startsWith('/#')) {
    // Extract section ID from path
    const sectionId = to.path.substring(1) // Remove the leading '/'
    
    // Wait for the component to be mounted, then scroll to section
    setTimeout(() => {
      const element = document.querySelector(sectionId)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }, 100)
  }
})

export default router
