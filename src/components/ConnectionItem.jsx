const ConnectionItem = ({ user }) => {
  return (
    <li className="h-16" data-connectionId={user?._id}>
      <a>
        <img
          height={40}
          width={40}
          className="rounded-full"
          src={user?.photoUrl}
        />
        <p className="text-xl">{user?.firstName + " " + user?.lastName}</p>
      </a>
    </li>
  );
};

export default ConnectionItem;
