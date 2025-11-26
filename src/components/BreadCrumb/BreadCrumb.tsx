import Link from "next/link";

interface Props {
  gameTitle: string;
}

function BreadCrumb(props: Props) {
  const { gameTitle } = props;

  return (
    <nav className="text-sm text-gray-500 my-4">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:underline hover:decoration-pink-500 hover:underline-offset-4 transition-all">
            Games
          </Link>
        </li>
        <li>/</li>
        <li className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-semibold">{gameTitle}</li>
      </ol>
    </nav>
  );
}

export default BreadCrumb;
