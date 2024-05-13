function MealDetailPage({ params }) {
  return (
    <>
      <h1 style={{ color: "white", textAlign: "center" }}>Meal Detail Page</h1>
      <p>{params.slug}</p>
    </>
  );
}

export default MealDetailPage;
