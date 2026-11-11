import express, { type Request, type Response} from "express";
import cors from 'cors';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const app = express();
const port = process.env["PORT"] ?? 4182;

app.use(cors());

const screenshot = async (url: string, width: number, height: number) => {
    const page = await browser.newPage({
        viewport: { width, height },
        deviceScaleFactor: 2
    });
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    return await page.screenshot({ type: 'png', fullPage: true }).finally(() => {
        page.close();
    });
}

app.get('/screenshot', (req: Request, res: Response) => {
    const { url, width = 1024, height = 1024 } = req.query;
    if (url) {
        screenshot(url as string, Number(width), Number(height)).then((buffer) => {
            res.set('Content-Type', 'image/png');
            res.send(buffer)
        }).catch((e) => {
            if (e instanceof Error) {
                console.log(e.message);
            }
            res.status(404).send('Not found');
        })
    } else {
        res.status(400).json({ error: 'Missing url query parameter' })
    }
})

app.all('/{*splat}', (_, res) => {
    res.status(404).json({ error: 'Not Found' })
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
