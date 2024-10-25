const UserCard = ({ user }) => {
  console.log("Priniting the card of ", user);
  const { firstName, lastName, age, gender, photoUrl, about } = user;
  return (
    <div className="card card-compact bg-base-300 w-96 shadow-xl">
      <figure>
        <img className="h-72" src={user?.photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age + " " + gender}</p>
        <p>{about}</p>
        <div className="card-actions flex justify-center gap-3 py-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Intrested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
