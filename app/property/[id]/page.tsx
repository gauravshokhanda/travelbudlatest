// app/property/[id]/page.tsx

interface PageProps {
  params: {
    id: string;
  };
}

export default function PropertyPage({ params }: PageProps) {
  return (
    <div>
      Property ID: {params.id}
    </div>
  );
}
