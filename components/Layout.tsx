import { motion } from 'framer-motion';

const Layout = ({ children }: any) => {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3, delay: 0.1 }}>
        {children}
      </motion.div>
    </>
  );
};

export default Layout;
