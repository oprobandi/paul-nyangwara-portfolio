/**
 * AnimSection.jsx — Scroll-triggered fade-in wrapper
 * Paul Nyang'wara Portfolio v6.2
 *
 * Replaces the local AnimSection + useInView definition that was
 * duplicated in every single page file. Import once, use everywhere.
 *
 * Usage:
 *   <AnimSection delay={0.1}>
 *     <MyContent />
 *   </AnimSection>
 */
import { useInView } from '../hooks/useInView';

export default function AnimSection({ children, style = {}, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
