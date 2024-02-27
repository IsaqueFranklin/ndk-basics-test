/* eslint-disable @next/next/no-img-element */
export default function Event({ event }) {
    const stringify = (event) => {
      return JSON.stringify(
        event.rawEvent(),
        null,
        2
      );
    };
  
    const renderEvent = (event) => {
      if (event.kind === 0) {
        const parsed = JSON.parse(event.content);
        return (
          <div className="p-6 flex border border-white rounded-2xl max-w-4xl">
            <img className="rounded-full h-32 w-32" src={parsed.picture} alt="" />
            <div className="mx-4 my-auto">
                <h3 className="text-3xl font-semibold mb-1">{parsed.name}</h3>
                <p className="mb-2">{parsed.nip05}</p>
                <p>{parsed.about}</p>
            </div>
          </div>
        );
      } else {
        // TODO: render other kinds of events. Start with kind 1 (plain text note)
        return (
          <div className="max-w-4xl">
            <pre
              style={{
                padding: "10px",
                borderRadius: "5px",
                fontFamily: "monospace",
              }}
            >
              {stringify(event)}
            </pre>
          </div>
        );
      }
    };
  
    return <div>{event && renderEvent(event)}</div>;
  }