import Head from "next/head";
import styles from "@/styles/Home.module.css";
import NDK from "@nostr-dev-kit/ndk";
import Search from "./Search";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="NDK Basics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center p-[6rem] min-h-[100vh] mx-auto">
        <Search />
      </main>
    </>
  );
}

// define the relays to publish and read from
const defaultRelays = ["wss://relay.damus.io", "wss://relay.primal.net"];

// create a new NDK instance
const ndk = new NDK({ explicitRelayUrls: defaultRelays });

// connect to the relays
ndk
  .connect()
  .then(() => console.log("ndk connected"))
  .catch((err) => console.error(err));

export { ndk };