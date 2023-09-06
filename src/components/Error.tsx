import { serialize } from "@/libs/utils";

export const NetworkError = (props: any) => {
  if (props) {
    console.group("NetworkError");
    console.log(props);
    console.groupEnd();
  } else {
    return null;
  }

  return (
    <div className="flex flex-col justify-center max-w-full max-h-full px-6 py-6 mx-6 my-6 overflow-auto overflow-x-auto whitespace-pre-wrap bg-blue-400 border-2 border-red-600 border-dashed">
      <h2 className="text-xl font-semibold text-red-900">Error:</h2>
      <pre className="px-4 py-4 whitespace-pre-wrap">
        {serialize(props, undefined, 2)}
      </pre>
    </div>
  );
};
