import ExclamationIcon from "../../assets/icons/exclamation.svg";

interface ErrorInterface {
  message: string;
}

export default function Error({ message }: ErrorInterface) {
  return (
    <div className="w-full flex items-center justify-center gap-3 p-2 border-2 rounded-md bg-yellow-600 bg-opacity-40 border-yellow-400">
      <img src={ExclamationIcon} alt="Exclamation Icon" />
      <p>{message || "Internal error"}</p>
    </div>
  );
}
