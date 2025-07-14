interface PageProps {
  params: {
    city: string;
  };
}

export default function StaysPage({ params }: PageProps) {
  return (
    <div>
      City: {params.city}
    </div>
  );
}
