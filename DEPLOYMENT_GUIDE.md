# Step-by-Step Guide: Deploying Dinterio to Hostinger hPanel

Your website is built and optimized. Follow these exact steps to get it live on Hostinger.

## Step 1: Prep Your Files (On Your Mac)
Since we used "standalone" mode, all the heavy logic is in the `.next/standalone` folder. To make uploading easier:
1.  Go to your project folder: `/Users/vamsiyakasiri/Documents/Dinterio Website`
2.  Go into `.next/standalone/`
3.  **Copy** everything inside `.next/standalone/` to a new folder on your Desktop named `upload_me`.
4.  **Copy** the `public` folder from your project root into `upload_me`.
5.  **Copy** the `.next/static` folder into `upload_me/.next/` (Create the `.next` folder inside `upload_me` if it's not there).
6.  **Zip** the contents of `upload_me` (Select all -> Right Click -> Compress). You should have an `upload_me.zip`.

## Step 2: Setup Node.js on Hostinger
1.  Log in to your **Hostinger hPanel**.
2.  Go to **Websites** -> **Manage** for your domain.
3.  Search for **Node.js** in the sidebar (usually under 'Advanced').
4.  Click **Create Application**.
5.  Set your:
    *   **Application Name**: `dinterio`
    *   **Domain**: `yourdomain.com`
    *   **Node.js Version**: Select 20.x or higher.
    *   **Application Port**: `3000` (or leave default).

## Step 3: Uploading the Site
1.  In Hostinger hPanel, go to **Files** -> **File Manager**.
2.  Navigate to the directory created for your Node.js app (usually `public_html/dinterio`).
3.  **Delete** any default files inside it.
4.  **Upload** your `upload_me.zip`.
5.  **Extract** the zip file inside that directory.

## Step 4: Environment Variables (Critical for Contact Form)
Your contact form uses EmailJS. You must add these keys in the Hostinger Node.js panel:
1.  Go back to the **Node.js Dashboard** in hPanel.
2.  Look for **Environment Variables**.
3.  Add these keys (copy values from your `.env.local` file):
    *   `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
    *   `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
    *   `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## Step 5: Start the Website
1.  In the Node.js Dashboard, set the **Start Command** or **Script**:
    ```bash
    node server.js
    ```
2.  Click **Run/Start**.
3.  Visit your domain — your luxury studio website should be live!

---

## Health Check Status: ✅ READY
*   **SEO**: Metadata & Schema.org Ready.
*   **Geo-Targeting**: Hyderabad keywords integrated.
*   **Performance**: Next.js Standalone build (Fastest loading).
*   **Admin Panel**: Build verified.
