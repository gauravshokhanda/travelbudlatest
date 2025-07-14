export default function PropertyPage({ params }: { params: { id: string } }) {
  return (
    <div>
      city: {params.id}
    </div>
  );
}