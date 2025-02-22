import Link from "next/link"
import { LinkIcon, Users, Zap } from "lucide-react"
import { Button } from "~/components/ui/button"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function LandingPage() {

  const user = await currentUser()

  if (user) {
    redirect("/dashboard")
  }


  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Commissioner: Streamline Your Real Estate Collaboration</h1>
        <p className="text-xl mb-8">The simple way for agents to share and access crucial property information.</p>
        <Button asChild size="lg">
          <Link href="/signup">Get Started</Link>
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Commissioner?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-primary" />}
              title="Quick Information Sharing"
              description="Instantly share key property details with other agents, streamlining your collaboration process."
            />
            <FeatureCard
              icon={<LinkIcon className="h-10 w-10 text-primary" />}
              title="Easy Property Linking"
              description="Create shareable links for individual properties or your entire portfolio with just a click."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Agent-to-Agent Focus"
              description="Designed specifically for agent collaboration, keeping sensitive information private from clients."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="Add Your Properties"
              description="Quickly input essential details about the properties you're representing."
            />
            <StepCard
              number={2}
              title="Share Information"
              description="Generate links to individual properties or your entire portfolio."
            />
            <StepCard
              number={3}
              title="Collaborate Efficiently"
              description="Other agents can instantly access the information they need to do business with you."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 bg-primary text-primary-foreground w-full">
        <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your Agent Collaboration?</h2>
        <p className="text-xl mb-8">
          Join Commissioner today and experience the easiest way to share property information.
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link href="/signup">Sign Up Now</Link>
        </Button>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
      {icon}
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
      <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}