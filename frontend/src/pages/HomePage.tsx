import { Link } from "react-router";
import { BarChart, Dumbbell, Timer, Menu } from "lucide-react";
import { motion, easeOut } from "framer-motion";
import { useState } from "react";

const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="text-muted-foreground hover:text-primary transition-colors duration-300"
  >
    {children}
  </Link>
);

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <Dumbbell className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">Workout Tracker</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/login">Login</NavLink>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden px-4 pt-2 pb-4 space-y-2"
          >
            <NavLink to="#features">Features</NavLink>
            <NavLink to="#cta">Get Started</NavLink>
            <NavLink to="/login">Login</NavLink>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 sm:pt-40 sm:pb-24 bg-gradient-to-b from-background to-card"
      >
        <Dumbbell className="w-24 h-24 text-primary" />
        <h1 className="text-6xl sm:text-8xl font-extrabold mt-6 tracking-tighter">
          Workout Tracker
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground mt-6 max-w-3xl">
          The ultimate companion for your fitness journey. Track, analyze, and
          achieve your goals with precision.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 mt-10">
          <Link
            to="/login"
            className="px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold text-xl shadow-2xl hover:bg-primary/80 transform hover:scale-105 transition-transform duration-300"
          >
            Get Started Now
          </Link>
          <a
            href="https://github.com/4li40/Workout-Tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 rounded-full border-2 border-border text-foreground font-bold text-xl shadow-2xl hover:bg-accent hover:text-accent-foreground transform hover:scale-105 transition-all duration-300"
          >
            View on GitHub
          </a>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 tracking-tight">
            Why You'll Love It
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 bg-card rounded-3xl shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300"
            >
              <BarChart className="w-16 h-16 text-primary mb-6" />
              <h3 className="text-3xl font-semibold mb-4">Track Progress</h3>
              <p className="text-muted-foreground text-lg">
                Log every set and exercise to see your strength gains over time
                with beautiful charts.
              </p>
            </motion.div>
            <motion.div
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 bg-card rounded-3xl shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300"
            >
              <Dumbbell className="w-16 h-16 text-primary mb-6" />
              <h3 className="text-3xl font-semibold mb-4">
                Customize Workouts
              </h3>
              <p className="text-muted-foreground text-lg">
                Create and tailor workout plans that fit your personal fitness
                goals and schedule.
              </p>
            </motion.div>
            <motion.div
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 bg-card rounded-3xl shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300"
            >
              <Timer className="w-16 h-16 text-primary mb-6" />
              <h3 className="text-3xl font-semibold mb-4">Stay Motivated</h3>
              <p className="text-muted-foreground text-lg">
                Visualize your achievements and stay on track with your fitness
                journey every day.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        id="cta"
        className="bg-card py-24 px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-5xl font-bold mb-6 tracking-tight">
          Ready to Start?
        </h2>
        <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-10">
          Join now and take the first step towards a stronger, healthier you.
          Your fitness journey begins here.
        </p>
        <Link
          to="/login"
          className="px-12 py-6 rounded-full bg-primary text-primary-foreground font-bold text-2xl shadow-2xl hover:bg-primary/80 transform hover:scale-105 transition-transform duration-300"
        >
          Sign Up for Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Workout Tracker. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
