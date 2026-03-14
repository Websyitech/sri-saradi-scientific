import { notFound } from 'next/navigation';
import PageContent from '../components/PageContent';
import { prisma } from '@/app/lib/prisma';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    const page = await prisma.page.findFirst({
      where: {
        slug: slug,
        isActive: true
      },
      select: {
        title: true,
        subtitle: true
      }
    });

    if (!page) {
      return {
        title: 'Page Not Found',
        description: 'The requested page could not be found.'
      };
    }

    return {
      title: page.title,
      description: page.subtitle || `${page.title} - Sri Saradi Scientific`,
    };
  } catch (error) {
    return {
      title: 'Error',
      description: 'An error occurred while loading the page.'
    };
  }
}

// Generate static params for static generation (optional - for better performance)
export async function generateStaticParams() {
  try {
    const pages = await prisma.page.findMany({
      where: {
        isActive: true
      },
      select: {
        slug: true
      }
    });

    return pages.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  
  // Check if page exists (this is for the server-side check)
  try {
    const page = await prisma.page.findFirst({
      where: {
        slug: slug,
        isActive: true
      },
      select: {
        id: true
      }
    });

    if (!page) {
      notFound();
    }
  } catch (error) {
    console.error('Error checking page existence:', error);
    notFound();
  }

  // Render the page content using the client component
  return <PageContent slug={slug} />;
}