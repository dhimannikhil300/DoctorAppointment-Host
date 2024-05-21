import HashLoader from "react-spinners/HashLoader"

const Loading = ({color="#0067ff"}) => {
  console.log(color);
  return (
    <div className="flex items-center justify-center w-full h-full">
        <HashLoader clolor={color} />
    </div>
  )
}

export default Loading