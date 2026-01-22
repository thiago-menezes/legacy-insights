import type { StrapiModality } from 'types/strapi/common';
import type { StrapiCourse, StrapiTeacher } from 'types/strapi/courses';

export const transformStrapiCourse = (strapi: StrapiCourse | undefined) => {
  if (!strapi) {
    return;
  }

  return {
    id: strapi.id,
    courseId: strapi.ids_dos_cursos,
    name: strapi.nome,
    description: strapi.sobre,
    methodology: strapi.metodologia,
    curriculumGrid: strapi.grade_curricular,
    certificate: strapi.certificado,
    featuredImage: strapi.capa?.url,
    institution: strapi.instituicao
      ? {
          id: strapi.instituicao.id,
          documentId: strapi.instituicao.documentId,
          name: strapi.instituicao.nome ?? '',
          slug: strapi.instituicao.slug,
        }
      : undefined,
    pedagogicalProject: strapi.projeto_pedagogico,
    featured: strapi.destaque ?? false,
    modalities: strapi.modalidades?.map((m: StrapiModality) => ({
      id: m.id,
      name: m.nome,
      slug: m.slug,
    })),
    faqs: strapi.FAQ?.mainEntity?.map((f) => ({
      question: f.name ?? '',
      answer: f.acceptedAnswer?.text ?? '',
    })),
    teachers: strapi.corpo_de_docentes?.map((t: StrapiTeacher) => ({
      id: t.id,
      name: t.nome,
      role: t.materia,
      modalities: t.modalidades?.map((m) => ({
        id: m.id,
        name: m.nome,
      })),
    })),
    coordinators: strapi.coordenadores?.map((t: StrapiTeacher) => ({
      id: t.id,
      name: t.nome,
      role: t.cargo,
      title: t.cargo,
      bio: t.biografia,
      description: t.descricao,
      image: t.foto?.url,
      photo: t.foto?.url,
      phone: t.telefone,
      whatsapp: t.whatsapp,
    })),
    seo: strapi.seo
      ? {
          title: strapi.seo.metaTitle,
          description: strapi.seo.metaDescription,
          canonical: strapi.seo.canonicalURL,
          keywords: strapi.seo.keywords,
          robots: strapi.seo.metaRobots,
          structuredData: strapi.seo.structuredData,
          image: strapi.seo.metaImage?.url,
        }
      : undefined,
  };
};
