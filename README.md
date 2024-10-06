This is a [Next.js](https://nextjs.org/) single page application (SPA) proof of concept that manages a list of notes fetched from the Pocketbase database server.

Pocketbase is a lightweight server (using SQLite) to create/manage datamodels from which data can be fetched through their API.

<img width="555" alt="_react-next-pocketbase-poc-screenshot" src="https://github.com/user-attachments/assets/aef2341f-9128-4806-96ab-8377441f64c1">



## Getting Started

First in the terminal run to install package:
```bash
npm i
```

Run the pocketbase db server:
```bash
./pocketbase serve
```

Now open another terminal tab and run the development server to start the SPA:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
