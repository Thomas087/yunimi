<script setup lang="ts">
import Divider from "primevue/divider"
import Container from '../../../components/layout/Container.vue'
</script>

<template>
  <footer class="footer">
    <Container>
      <div class="footer-content">
        <div class="footer-section">
          <h4>Yunimi</h4>
          <p>Building the future, one solution at a time.</p>
        </div>
        <div class="footer-section">
          <h5>Product</h5>
          <ul>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Documentation</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h5>Company</h5>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h5>Support</h5>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Status</a></li>
          </ul>
        </div>
      </div>
      <Divider />
      <div class="footer-bottom">
        <p>&copy; 2024 Yunimi. All rights reserved.</p>
      </div>
    </Container>
  </footer>
</template>

<style scoped>
.footer {
  background: #2c3e50;
  color: white;
  padding: 60px 20px 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h4 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #667eea;
}

.footer-section h5 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer-section p {
  color: #bdc3c7;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: #667eea;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  color: #bdc3c7;
}
</style>
