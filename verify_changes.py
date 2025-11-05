import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        files = [
            "index.html",
            "about.html",
            "Clients.html",
            "Contact.html",
            "Portfolio.html",
            "pricing_page.html",
            "services.html",
        ]

        for file in files:
            await page.goto(f"http://localhost:8000/{file}")

            # Wait for the header to be loaded
            await page.wait_for_selector("#themeToggle")

            # Test theme toggle to light mode
            await page.click("#themeToggle")
            await page.wait_for_function("!document.documentElement.classList.contains('dark')")
            print(f"Theme toggled to light mode on {file}")

            # Test theme toggle back to dark mode
            await page.click("#themeToggle")
            await page.wait_for_function("document.documentElement.classList.contains('dark')")
            print(f"Theme toggled back to dark mode on {file}")

            # Test mobile menu
            await page.set_viewport_size({"width": 375, "height": 667})
            await page.click("#menuToggle")
            await page.wait_for_selector("#mobileMenu", state="visible")
            print(f"Mobile menu opened on {file}")

            # Test closing mobile menu
            await page.click("#closeMenu")
            await page.wait_for_selector("#mobileMenu", state="hidden")
            print(f"Mobile menu closed on {file}")

            # Capture screenshot
            await page.screenshot(path=f"screenshot_{file}.png")
            print(f"Screenshot taken for {file}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
