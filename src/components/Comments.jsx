import { useCommentsDataWithState } from "../data/useCommentsData.js";

function Comments() {
    const { data } = useCommentsDataWithState();

    console.log('comments ',data)
    if(!data) return null
    return (
      <div className="comments-container">
        <h1>Comments: </h1>
        <div>
          {Array.isArray(data) && data?.map(({ title, description, id }) => (
            <div
              key={id}
              style={{
                padding: "4px 8px",
                fontFamily: "monospace",
              }}
            >
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    );
}

export { Comments }