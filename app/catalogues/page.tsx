"use client";

import { useState, useEffect } from "react";
import { FaDownload, FaEye } from "react-icons/fa";

interface Catalogue {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  pdfUrl?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CataloguesPage() {
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCatalogues();
  }, []);

  async function fetchCatalogues() {
    try {
      const res = await fetch("/api/catalogues");
      const data = await res.json();
      setCatalogues(Array.isArray(data) ? data.filter((c: Catalogue) => c.isActive) : []);
    } catch (error) {
      console.error("Error fetching catalogues:", error);
      setCatalogues([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading catalogues...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Product Catalogues</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Browse and download our comprehensive product catalogues featuring the latest life sciences solutions
            </p>
          </div>
        </div>
      </section>

      {/* Catalogues Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {catalogues.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">No Catalogues Available</h3>
              <p className="text-gray-600">Please check back later for our product catalogues.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {catalogues.map((catalogue) => (
                <div
                  key={catalogue.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Cover Image */}
                  <div className="relative h-64 bg-gray-200">
                    {catalogue.coverImage ? (
                      <img
                        src={catalogue.coverImage}
                        alt={catalogue.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <div className="text-6xl mb-2">📚</div>
                          <p>Catalogue Cover</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{catalogue.title}</h3>
                    {catalogue.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{catalogue.description}</p>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      {catalogue.pdfUrl && (
                        <>
                          <a
                            href={catalogue.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                          >
                            <FaEye /> View PDF
                          </a>
                          <a
                            href={catalogue.pdfUrl}
                            download
                            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2 text-sm font-medium"
                          >
                            <FaDownload /> Download
                          </a>
                        </>
                      )}
                      {!catalogue.pdfUrl && (
                        <div className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg text-center text-sm">
                          PDF Coming Soon
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Contact our experts for personalized product recommendations and custom solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
            >
              Contact Us
            </a>
            <a
              href="/products"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 font-medium"
            >
              Browse Products
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}