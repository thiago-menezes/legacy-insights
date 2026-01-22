'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { Button } from 'reshaped';
import { Icon } from '@/components';
import styles from './styles.module.scss';
import { Area } from './types';

export const AreaCard = ({ area }: { area: Area }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (listRef.current) {
      setIsButtonDisabled(listRef.current.clientHeight < 240);
    }
  }, [area.courses, listRef]);

  const handleShowMore = () => {
    listRef.current?.scrollTo({
      top: listRef.current?.scrollTop + 180,
      behavior: 'smooth',
    });
  };

  return (
    <article className={styles.card} role="listitem">
      <div className={styles.imageWrapper}>
        <Image
          src={area.imageUrl}
          alt={`Área ${area.title}`}
          width={290}
          height={180}
          loading="lazy"
        />
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.areaTitle}>{area.title}</h3>

        <div className={styles.courseList} ref={listRef}>
          {area.courses.map((course) => (
            <Link key={course.id} href={`/cursos?course=${course.name}`}>
              <Button className={styles.courseButton}>
                {course.name}
                <Icon name="chevron-right" size={16} />
              </Button>
            </Link>
          ))}
        </div>

        <div className={styles.allCourses}>
          <Button
            onClick={handleShowMore}
            variant="ghost"
            color="primary"
            icon={<Icon name="link" size={16} />}
            fullWidth
            disabled={isButtonDisabled}
          >
            Mostrar mais
          </Button>
        </div>
      </div>
    </article>
  );
};
