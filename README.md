# **Blue Grass Automation QA Assessment**

## **Project Overview**
This project is an automated end-to-end testing framework for the **Blue Grass Automation** web application using **Playwright**. It includes test cases covering **positive, negative, and edge cases** for the application's core functionalities.

## **Project Structure**
```
📁 bg_qa_engineering_technical_assessment
│-- 📁 e2e                     # End-to-End tests
│-- 📁 src                     # Source code
│-- 📁 playwright-report       # HTML reports (auto-generated)
│-- 📄 playwright.config.ts    # Playwright test configuration
│-- 📄 package.json            # Dependencies and scripts
│-- 📄 README.md               # Project documentation
```

## **Setup Instructions**
### **Prerequisites**
Ensure the following are installed:
- **Node.js** (LTS version recommended)
- **npm** or **yarn**

### **Installation**
Clone the repository and install dependencies:
```bash
# Clone the repository
git clone <repository_url>
cd bg_qa_engineering_technical_assessment

# Install dependencies
npm install
```

### **Environment Variables**
Create a `.env` file in the root directory and define the required environment variables:
```
REACT_APP_HOST_API_KEY=http://localhost:3000
```
Verify environment variables are set correctly:
```bash
node checkEnv.js
```

## **Running Tests**
### **Execute all tests**
```bash
npm run test:e2e
```

### **Run tests with UI mode**
```bash
npx playwright test --ui
```

### **Run tests in non-headless mode with slow motion**
```bash
npx playwright test --headed --slow-mo 1000
```

## **Test Cases**
### **Positive Tests**
- User can **navigate** across different screens
- User can **log in** with valid credentials
- User can **reset and update password**
- User can **sign up** successfully

### **Negative Tests**
- Logging in with incorrect credentials
- Submitting empty or invalid form fields
- Attempting unauthorized access to restricted pages

### **Edge Cases**
- Email input exceeding maximum character limit
- Address field ambiguity (physical vs. email address validation)
- Date of birth input errors with misleading messages

## **Handling UI Elements**
We implemented best practices for interacting with UI elements:
- Using **explicit waits** to verify elements
- Ensuring required **click actions** before filling text fields
- Checking **pop-up error messages** upon form submission failures

## **Generating HTML Reports**
After running tests, an **HTML report** is automatically generated in `playwright-report/`. To open it:
```bash
npx playwright show-report
```

## **CI/CD Integration (Sample GitHub Actions Pipeline)**
To automate test execution, integrate the following **GitHub Actions workflow**:
```yaml
name: Playwright Tests
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
      
      - name: Install dependencies
        run: npm install
      
      - name: Run Playwright tests
        run: npm run test:e2e
      
      - name: Upload Playwright Report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

## **Improvements & Recommendations**
- **UI Enhancements**:
  - Improve page navigation by **removing redundant steps**
  - Clarify **error messages** for better user experience
- **Test Optimizations**:
  - Use **iterative functions** instead of repeated code
  - Increase **reusability of selectors**

## **Conclusion**
This **QA Automation framework** ensures **reliable test execution**, **scalability**, and **robust reporting** for the **Blue Grass Automation** application. 🎯

---
**Maintained by:** QA Engineering Team 🚀

