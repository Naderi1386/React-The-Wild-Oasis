
interface EmptyPropType {
  resource:string
}
function Empty({ resource }:EmptyPropType) {
  return <p>No {resource} could be found.</p>;
}

export default Empty;
