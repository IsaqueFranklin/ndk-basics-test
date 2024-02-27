import { useState } from "react";
import styles from "@/styles/Home.module.css";
import { ndk } from "@/pages/index";
import { nip19 } from "nostr-tools";
import Event from "./Event";

const Search = () => {
  const [input, setInput] = useState("");
  const [ndkEvent0, setNdkEvent0] = useState(null);
  const [ndkEvent1, setNdkEvent1] = useState(null);

  // to serach for a kind 0 event singed by a specific pubkey
  const kind0Filter = (pubkey) => ({
    kinds: [0],
    authors: [pubkey],
  });

  const kind1Filter = (pubkey) => ({
    kinds: [1],
    authors: [pubkey],
  });

  // to search for an event by it's id
  const eventIdFilter = (id) => ({
    ids: [id],
  });

  // takes a query in the form of "note..." or "npub..."
  // TODO: expand to accept more query types
  const search = async (query) => {
    // tell the relays what we're looking for with a "filter"
    // https://github.com/nostr-protocol/nips/blob/master/01.md#communication-between-clients-and-relays
    let filter0 = {};
    let filter1 = {};

    // nip19 defines a standard for bech32 encoding of different data types (pubkey, note id, etc.)
    // https://github.com/nostr-protocol/nips/blob/master/19.md
    if (query.startsWith("npub")) {
      const decodedNpub = nip19.decode(query);
      const pubkey = decodedNpub.data;

      filter0 = kind0Filter(pubkey); // TODO: search for profile (kind 0) along with kind 1 events authored by this pubkey
      //filter1 = kind1Filter(pubkey);
    } else if (query.startsWith("note")) {
      const decodedNote = nip19.decode(query);
      const noteId = decodedNote.data;

      filter1 = eventIdFilter(noteId);
    }

    //console.log("SEARCH FILTER", filter);

    // fetchEvent takes a type of NDKFilter
    // see node_modules/@nostr-dev-kit/ndk/dist/index.d.ts --> "type NDKFilter"
    return await ndk.fetchEvent(filter0);
  };

  const handleSearch = async (query) => {
    const result = await search(query);
    if (result) {
      console.log("SEARCH RESULT", result);
      setNdkEvent0(result);
    }
  };

  return (
    <div className={`${styles.search}`}>
      <h2 className="text-4xl">Search Nostr</h2>
      <p>Search for a profile by npub... or a note by note...</p>
      <div className={`${styles.searchBar}`}>
        <input
            className="bg-black text-white border rounded-2xl border-white px-4 py-2"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => handleSearch(input)} className="bg-white text-black rounded-2xl hover:bg-gray-700 hover:text-white">Search</button>
      </div>
      <Event event={ndkEvent0} />
      <hr />
    </div>
  );
};

export default Search;