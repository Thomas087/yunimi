<script setup lang="ts">
import Container from '../../../components/layout/Container.vue'
</script>

<template>
  <footer id="contact" class="footer">
    <Container>
      <div class="footer-content">
        <div class="footer-main">
          <div class="footer-brand">
            <h3 class="brand-name">Yunimi</h3>
            <p class="brand-tagline">Making your brand visible to Chinese consumers.</p>
          </div>
          
          <div class="footer-links">
            <div class="link-group">
              <h5>Product</h5>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#">Documentation</a>
            </div>
            <div class="link-group">
              <h5>Company</h5>
              <a href="#about">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
            </div>
            <div class="link-group">
              <h5>Support</h5>
              <a href="#">Help Center</a>
              <a href="#contact">Contact</a>
              <a href="#">Status</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2024 Yunimi. All rights reserved.</p>
        </div>
      </div>
    </Container>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  color: #1e293b;
  padding: 60px 20px 40px;
  border-top: 1px solid #e2e8f0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 3rem;
}

.footer-brand {
  flex: 1;
  max-width: 400px;
}

.brand-name {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1e293b;
  line-height: 1.2;
}

.brand-tagline {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  min-width: 120px;
}

.link-group h5 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.link-group a {
  color: #64748b;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
  line-height: 1.5;
}

.link-group a:hover {
  color: #1e293b;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 0.875rem;
}

.footer-bottom p {
  margin: 0;
}

/* Responsive Design */
@media (max-width: 968px) {
  .footer {
    padding: 50px 20px 30px;
  }
  
  .footer-main {
    flex-direction: column;
    gap: 2.5rem;
  }
  
  .footer-links {
    gap: 1.25rem;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 20px 30px;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 1rem;
  }
  
  .link-group {
    min-width: auto;
  }
  
  .brand-name {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 30px 20px 25px;
  }
  
  .footer-main {
    gap: 2rem;
  }
  
  .brand-name {
    font-size: 1.375rem;
  }
  
  .brand-tagline {
    font-size: 0.95rem;
  }
}
</style>
