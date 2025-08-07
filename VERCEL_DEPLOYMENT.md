# Vercel Deployment Guide

## Overview
This guide will help you deploy the SafeHaven Security Systems frontend to Vercel.

## Prerequisites

1. **Vercel CLI Installation**
   ```bash
   npm install -g vercel
   ```

2. **Vercel Account**
   - Sign up at [vercel.com](https://vercel.com)
   - Login via CLI: `vercel login`

3. **PowerShell Execution Policy**
   If you get execution policy errors, run:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

## Deployment Steps

### Option 1: Using the Deployment Script
```powershell
# Run the PowerShell deployment script
.\deploy-vercel.ps1
```

### Option 2: Manual Deployment

1. **Build Shared Package**
   ```bash
   cd shared
   npm run build
   ```

2. **Build Frontend**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

## Configuration Files

### Root vercel.json
- Main deployment configuration
- Specifies build commands and output directory
- Handles API rewrites and security headers

### Frontend vercel.json
- Frontend-specific configuration
- API function runtime settings
- Static asset caching rules

### .vercelignore
- Excludes unnecessary files from deployment
- Improves build performance
- Reduces deployment size

## Environment Variables

Set these in your Vercel dashboard:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_WEATHER=true
```

## Custom Domains

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Domains
4. Add your custom domain
5. Configure DNS settings as instructed

## Monitoring & Analytics

### Vercel Analytics
- Built-in performance monitoring
- Real-time metrics
- Error tracking

### Custom Analytics
- Google Analytics integration
- Custom event tracking
- Performance monitoring

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18.x recommended)
   - Verify all dependencies are installed
   - Check TypeScript compilation errors

2. **API Errors**
   - Verify backend is deployed and accessible
   - Check CORS configuration
   - Validate environment variables

3. **Performance Issues**
   - Enable Vercel Analytics
   - Optimize images and assets
   - Use CDN for static files

### Debug Commands

```bash
# Check Vercel CLI version
vercel --version

# List projects
vercel ls

# View deployment logs
vercel logs

# Pull latest environment variables
vercel env pull
```

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive data
   - Use Vercel's environment variable system
   - Rotate API keys regularly

2. **Headers**
   - Security headers are configured in vercel.json
   - CSP, XSS protection, and frame options
   - HTTPS enforcement

3. **API Security**
   - Rate limiting on API routes
   - Input validation
   - CORS configuration

## Performance Optimization

1. **Build Optimization**
   - Tree shaking enabled
   - Code splitting
   - Image optimization

2. **Runtime Optimization**
   - Edge functions for API routes
   - Static generation where possible
   - Incremental Static Regeneration

3. **Caching Strategy**
   - Static assets cached for 1 year
   - API responses cached appropriately
   - CDN distribution

## Support

For issues with:
- **Vercel Platform**: [Vercel Support](https://vercel.com/support)
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **Project Specific**: Check the project documentation

## Deployment Checklist

- [ ] Shared package built successfully
- [ ] Frontend builds without errors
- [ ] Environment variables configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Analytics tracking working
- [ ] API endpoints responding
- [ ] Performance monitoring active
- [ ] Error tracking configured
- [ ] Backup strategy in place
