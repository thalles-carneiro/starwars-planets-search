type ErrorMessageProps = {
  message: string,
};

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <h1>{ message }</h1>
  );
}

export default ErrorMessage;
