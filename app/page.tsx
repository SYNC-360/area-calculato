"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, TrendingUp, Zap, BookOpen } from 'lucide-react';

export default function AreaCalculator() {
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState<'radius' | 'diameter' | 'circumference'>('radius');
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const calculateArea = useCallback(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) {
      setResult(null);
      setSteps(['Please enter a valid positive number.']);
      return;
    }

    let area: number;
    let calculationSteps: string[] = [];

    switch (inputType) {
      case 'radius':
        area = Math.PI * value * value;
        calculationSteps = [
          `Given: Radius (r) = ${value}`,
          `Formula: A = πr²`,
          `Step 1: Square the radius`,
          `r² = ${value}² = ${value * value}`,
          `Step 2: Multiply by π`,
          `A = π × ${value * value}`,
          `A = 3.14159... × ${value * value}`,
          `A = ${area.toFixed(4)} square units`
        ];
        break;
      case 'diameter':
        area = Math.PI * (value / 2) * (value / 2);
        calculationSteps = [
          `Given: Diameter (d) = ${value}`,
          `Formula: A = π(d/2)² or A = πd²/4`,
          `Step 1: Find radius = d/2`,
          `r = ${value}/2 = ${value / 2}`,
          `Step 2: Square the radius`,
          `r² = ${value / 2}² = ${(value / 2) * (value / 2)}`,
          `Step 3: Multiply by π`,
          `A = π × ${(value / 2) * (value / 2)}`,
          `A = ${area.toFixed(4)} square units`
        ];
        break;
      case 'circumference':
        area = (value * value) / (4 * Math.PI);
        calculationSteps = [
          `Given: Circumference (C) = ${value}`,
          `Formula: A = C²/(4π)`,
          `Step 1: Square the circumference`,
          `C² = ${value}² = ${value * value}`,
          `Step 2: Divide by 4π`,
          `A = ${value * value}/(4 × π)`,
          `A = ${value * value}/(4 × 3.14159...)`,
          `A = ${value * value}/12.56637...`,
          `A = ${area.toFixed(4)} square units`
        ];
        break;
      default:
        area = 0;
    }

    setResult(area);
    setSteps(calculationSteps);
  }, [inputType, inputValue]);

  useEffect(() => {
    if (inputValue) {
      calculateArea();
    }
  }, [calculateArea, inputValue]);

  return (
    <>
      {/* Clean Hero Section */}
      <header className="bg-gradient-to-b from-indigo-50 to-white border-b border-gray-200" role="banner">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Simple Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Area of a Circle Calculator
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Calculate the area of any circle using radius, diameter, or circumference.
              Free, accurate, and instant results with step-by-step solutions.
            </p>
          </div>

          {/* Clean Calculator Layout */}
          <section className="max-w-4xl mx-auto" aria-label="Circle Area Calculator">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Left Side - Calculator */}
                <article className="p-8 border-r border-gray-200" role="main" aria-label="Calculator Input">
                  <fieldset className="mb-6">
                    <legend className="block text-sm font-bold text-gray-900 mb-3">
                      Select Input Type
                    </legend>
                    <div className="grid grid-cols-3 gap-2" role="group" aria-label="Input type selection">
                      {(['radius', 'diameter', 'circumference'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setInputType(type)}
                          aria-pressed={inputType === type}
                          aria-label={`Select ${type} input method`}
                          className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                            inputType === type
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="mb-6">
                    <label htmlFor="circle-input" className="block text-sm font-bold text-gray-900 mb-2">
                      Enter {inputType} value
                    </label>
                    <input
                      id="circle-input"
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter value"
                      aria-label={`Enter ${inputType} value`}
                      aria-describedby="input-help"
                      className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                      min="0"
                      step="any"
                    />
                    <p id="input-help" className="text-sm text-gray-700 font-medium mt-2">
                      Use any positive number with optional decimals
                    </p>
                  </fieldset>

                  {result !== null && (
                    <aside className="bg-indigo-600 text-white rounded-lg p-4" aria-label="Calculation result" role="status" aria-live="polite">
                      <p className="text-sm font-medium opacity-90 mb-1">Calculated Area</p>
                      <p className="text-3xl font-bold" aria-label={`Result: ${result.toFixed(4)} square units`}>
                        {result.toFixed(4)}
                      </p>
                      <p className="text-sm mt-1 opacity-90">square units</p>
                    </aside>
                  )}
                </article>

                {/* Right Side - Formula Display */}
                <aside className="p-8 bg-gray-50" aria-label="Formula reference">
                  <h2 className="font-bold text-gray-900 mb-4">Active Formula</h2>
                  <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6" role="doc-formula">
                    <p className="text-2xl font-mono font-bold text-indigo-600" aria-label="Mathematical formula">
                      {inputType === 'radius' ? 'A = πr²' :
                       inputType === 'diameter' ? 'A = πd²/4' :
                       'A = C²/(4π)'}
                    </p>
                  </div>

                  {steps.length > 0 && inputValue && (
                    <section aria-label="Step-by-step calculation">
                      <h3 className="font-bold text-gray-900 mb-3">Calculation Steps</h3>
                      <ol className="space-y-2">
                        {steps.slice(0, 4).map((step, index) => (
                          <li key={index} className="text-sm text-gray-800 font-medium">
                            <span className="sr-only">Step {index + 1}:</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </section>
                  )}
                </aside>
              </div>
            </div>
          </section>

          {/* Quick Stats Bar */}
          <section className="max-w-4xl mx-auto mt-8 grid grid-cols-3 gap-4" aria-label="Calculator features">
            <article className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <Zap className="w-6 h-6 text-indigo-600 mx-auto mb-2" aria-hidden="true" />
              <p className="text-sm font-bold text-gray-900">Instant Results</p>
            </article>
            <article className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <TrendingUp className="w-6 h-6 text-indigo-600 mx-auto mb-2" aria-hidden="true" />
              <p className="text-sm font-bold text-gray-900">15+ Decimal Precision</p>
            </article>
            <article className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <BookOpen className="w-6 h-6 text-indigo-600 mx-auto mb-2" aria-hidden="true" />
              <p className="text-sm font-bold text-gray-900">Step-by-Step Guide</p>
            </article>
          </section>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">

        {/* Formula Cards */}
        <section className="mb-16" aria-label="Calculation methods">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Three Ways to Calculate Circle Area
          </h2>
          <div className="grid md:grid-cols-3 gap-6" role="list">
            <article className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 transition-colors" role="listitem">
              <div className="text-3xl font-mono font-bold text-indigo-600 mb-4" role="doc-formula">A = πr²</div>
              <h3 className="font-bold text-gray-900 mb-2">Using Radius</h3>
              <p className="text-gray-800 font-medium">
                Square the radius and multiply by π. The most common method for finding area.
              </p>
            </article>
            <article className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 transition-colors" role="listitem">
              <div className="text-3xl font-mono font-bold text-indigo-600 mb-4" role="doc-formula">A = πd²/4</div>
              <h3 className="font-bold text-gray-900 mb-2">Using Diameter</h3>
              <p className="text-gray-800 font-medium">
                Square the diameter, multiply by π, then divide by 4.
              </p>
            </article>
            <article className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 transition-colors" role="listitem">
              <div className="text-3xl font-mono font-bold text-indigo-600 mb-4" role="doc-formula">A = C²/4π</div>
              <h3 className="font-bold text-gray-900 mb-2">Using Circumference</h3>
              <p className="text-gray-800 font-medium">
                Square the circumference and divide by 4π.
              </p>
            </article>
          </div>
        </section>

        {/* Educational Content */}
        <article className="prose prose-lg max-w-none mb-16" itemScope itemType="https://schema.org/Article">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Complete Guide to Finding the Area of a Circle
          </h2>
          
          <div className="bg-gray-50 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Circle Area</h3>
            <p className="text-gray-800 font-medium leading-relaxed mb-4">
              The <strong className="text-gray-900">area of a circle</strong> represents the total space enclosed within its circumference.
              Unlike the <a href="https://circumferenceofacircle.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">circumference</a>
              which measures the perimeter, area quantifies the entire two-dimensional surface contained within the circle's boundary.
              You can also <a href="https://circumferenceofacircleformula.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">learn more about circumference and area formulas</a> together.
            </p>
            <p className="text-gray-800 font-medium leading-relaxed mb-4">
              The formula A = πr² shows how area scales quadratically with radius. This means doubling the radius
              quadruples the area—a principle that explains why large pizzas offer much better value per square inch
              than small ones. Understanding this relationship is crucial for applications ranging from architecture
              to manufacturing. This concept also applies when you need to <a href="https://howtofindcircumferenceofacircle.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">find the circumference of a circle</a>.
            </p>
            <p className="text-gray-800 font-medium leading-relaxed">
              To master circle calculations, you should also understand how to find the
              <a href="https://radiusofacircle.com" className="text-indigo-600 hover:text-indigo-800 font-semibold"> radius</a> from area,
              or determine the <a href="https://diameterofacircle.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">diameter</a>
              when only area is known. For a deeper understanding of the mathematical principles, visit our
              <a href="https://equationofacircle.com" className="text-indigo-600 hover:text-indigo-800 font-semibold"> circle equation guide</a>
              to see how area fits into the algebraic form (x-h)² + (y-k)² = r².
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">The History of π and Circle Area</h3>
          <p className="text-gray-800 font-medium leading-relaxed mb-4">
            Ancient civilizations recognized the constant relationship between a circle’s area and its radius squared. 
            The Babylonians approximated π as 3.125 around 1900 BCE, while ancient Egyptians used 3.16. The Greek 
            mathematician Archimedes (287-212 BCE) proved that the area of a circle equals half its circumference 
            times its radius, establishing the foundation for our modern formula A = πr².
          </p>
          <p className="text-gray-800 font-medium leading-relaxed mb-6">
            Chinese mathematician Liu Hui refined these calculations in 263 CE using a polygon approximation method, 
            achieving π accurate to 3.14159. Today, we can calculate π to trillions of digits, though just 39 digits 
            would suffice to calculate the circumference of the observable universe to within the width of a hydrogen atom.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step Calculation Methods</h3>
          
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Method 1: Using Radius (Most Common)</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-800 font-medium">
              <li>Identify or measure the radius (distance from center to edge)</li>
              <li>Square the radius by multiplying it by itself (r × r = r²)</li>
              <li>Multiply the result by π (approximately 3.14159)</li>
              <li>The result is your area in square units</li>
            </ol>
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <p className="font-mono text-gray-900 font-bold">Example: r = 10 units</p>
              <p className="font-mono text-gray-800">A = π × 10² = 3.14159 × 100 = 314.159 square units</p>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Method 2: Using Diameter</h4>
            <p className="text-gray-800 font-medium mb-3">
              When you know the diameter, use A = πd²/4. This is useful for physical measurements where finding 
              the exact center is difficult. Learn more at our 
              <a href="https://howtofindareaofacircle.com" className="text-indigo-600 hover:text-indigo-800 font-semibold"> detailed tutorial page</a>.
            </p>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="font-mono text-gray-900 font-bold">Example: d = 20 units</p>
              <p className="font-mono text-gray-800">A = π × 20²/4 = 3.14159 × 100 = 314.159 square units</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-World Applications</h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3">Engineering & Construction</h4>
              <p className="text-gray-800 font-medium">
                Engineers calculate cross-sectional areas of pipes, cables, and structural columns using πr².
                A water pipe with a 10cm radius has a cross-sectional area of 314.16 cm², determining its
                flow capacity. Circle area is also essential in <a href="https://densityformula.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">density formula calculations</a>
                for mass-to-area conversions. Understanding these calculations is essential for infrastructure design.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3">Agriculture & Irrigation</h4>
              <p className="text-gray-800 font-medium">
                Center pivot irrigation systems create circular fields. A 400-meter radius system covers
                50.26 hectares (502,654 m²). Farmers use this to calculate seed quantities, fertilizer needs,
                and expected yields. Visit our <a href="https://surfaceareaofacircle.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">surface area calculator</a>
                for 3D applications.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <ArrowRight className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Confusing area with circumference:</strong>
                <span className="text-gray-800 font-medium"> Area uses r² (square units) while circumference uses r (linear units). 
                Visit our <a href="https://circumferenceofacircleformula.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">circumference formula guide</a> to 
                understand the difference.</span>
              </div>
            </li>
            <li className="flex items-start">
              <ArrowRight className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Using diameter in radius formula:</strong>
                <span className="text-gray-800 font-medium"> If given diameter, either divide by 2 first or use the formula A = πd²/4.</span>
              </div>
            </li>
            <li className="flex items-start">
              <ArrowRight className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Forgetting to square the radius:</strong>
                <span className="text-gray-800 font-medium"> The formula is πr², not πr. This is the most common calculation error.</span>
              </div>
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Concepts</h3>
          <p className="text-gray-800 font-medium leading-relaxed mb-6">
            Understanding circle area leads to more complex calculations. The <a href="https://equationofacircle.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">equation of a circle</a>
            (x-h)² + (y-k)² = r² connects algebra with geometry. Circle areas also relate to <a href="https://supplementaryangles.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">supplementary angles</a> when measuring arc segments. For gaming applications, our
            <a href="https://minecraftcirclechart.com" className="text-indigo-600 hover:text-indigo-800 font-semibold"> Minecraft circle chart</a>
            helps create pixel-perfect circular builds. Advanced students can explore
            <a href="https://unitcircleradians.com" className="text-indigo-600 hover:text-indigo-800 font-semibold"> unit circle radians</a>
            for trigonometric applications. You can also <a href="https://circlepng.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">download circle diagrams and PNG resources</a>
            for visual reference.
          </p>
        </article>

        {/* Related Calculators Grid */}
        <section className="bg-indigo-50 rounded-2xl p-8 mb-12" aria-label="Related calculator tools">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Circle Calculator Network
          </h2>
          <nav className="grid md:grid-cols-4 gap-4" role="navigation" aria-label="Related tools">
            {[
              { name: "Lab101 Hub", url: "https://lab101.com", desc: "Explore more circle tools", badge: "★ Primary Hub" },
              { name: "Circumference", url: "https://circumferenceofacircle.com", desc: "Find circumference from area" },
              { name: "Radius Finder", url: "https://radiusofacircle.com", desc: "Calculate radius from area" },
              { name: "Diameter", url: "https://diameterofacircle.com", desc: "Calculate diameter" },
              { name: "Area Formula", url: "https://formulaforareaofacircle.com", desc: "πr² explained" },
              { name: "How-To Guide", url: "https://howtofindareaofacircle.com", desc: "Step-by-step tutorials" },
              { name: "Circle Equation", url: "https://equationofacircle.com", desc: "Algebraic form" },
              { name: "Unit Circle", url: "https://unitcircleradians.com", desc: "Radians & trig" }
            ].map((tool, index) => (
              <a key={index} href={tool.url} className={`p-4 rounded-lg border transition-colors group ${
                index === 0
                  ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-white border-gray-200 hover:border-indigo-500'
              }`} aria-label={`${tool.name}: ${tool.desc}`}>
                <p className={`font-bold mb-1 ${index === 0 ? 'text-white' : 'text-gray-900 group-hover:text-indigo-600'}`}>
                  {tool.name}
                  {tool.badge && <span className="ml-2 text-xs">{tool.badge}</span>}
                </p>
                <p className={`text-sm font-medium ${index === 0 ? 'text-indigo-100' : 'text-gray-700'}`}>{tool.desc}</p>
              </a>
            ))}
          </nav>
        </section>
      </main>

      {/* Clean Footer with Backlink Network */}
      <footer className="mt-20 border-t border-gray-200 bg-gray-50" role="contentinfo">
  <div className="max-w-6xl mx-auto px-4 py-10">
    <div className="grid md:grid-cols-4 gap-8">

      {/* Hub Navigation */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">📍 Primary Hub</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="https://lab101.com"
               className="text-indigo-600 hover:text-indigo-800 font-medium"
               title="Lab101 - Primary calculator hub">
              Explore Lab101
            </a>
            <span className="text-gray-500 block text-xs mt-1">Learn with Lab101</span>
          </li>
        </ul>
      </div>

      {/* Core Twin Pages */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Related Calculations</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="https://circumferenceofacircle.com"
               className="text-blue-600 hover:text-blue-800 font-medium"
               title="Circle circumference calculator">
              ⭐ Circumference Calculator
            </a>
          </li>
          <li>
            <a href="https://radiusofacircle.com"
               className="text-blue-600 hover:text-blue-800"
               title="Find radius from area">
              Radius Finder
            </a>
          </li>
          <li>
            <a href="https://diameterofacircle.com"
               className="text-blue-600 hover:text-blue-800"
               title="Calculate diameter">
              Diameter Calculator
            </a>
          </li>
        </ul>
      </div>

      {/* Formula & Equation Pages */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Formulas & Theory</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="https://circumferenceofacircleformula.com"
               className="text-blue-600 hover:text-blue-800"
               title="Circumference and area formulas">
              Circumference &amp; Area Formulas
            </a>
          </li>
          <li>
            <a href="https://equationofacircle.com"
               className="text-blue-600 hover:text-blue-800"
               title="Circle equation guide">
              Circle Equation
            </a>
          </li>
          <li>
            <a href="https://howtofindcircumferenceofacircle.com"
               className="text-blue-600 hover:text-blue-800"
               title="Step-by-step guide">
              How to Find Circumference
            </a>
          </li>
        </ul>
      </div>

      {/* Advanced & Applications */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Advanced Topics</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="https://densityformula.com"
               className="text-blue-600 hover:text-blue-800"
               title="Use area in density calculations">
              Density Formula
            </a>
          </li>
          <li>
            <a href="https://circlepng.com"
               className="text-blue-600 hover:text-blue-800"
               title="Download circle diagrams">
              Circle Diagrams &amp; PNG
            </a>
          </li>
          <li>
            <a href="https://unitcircleradians.com"
               className="text-blue-600 hover:text-blue-800"
               title="Unit circle and radians">
              Unit Circle Radians
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">About This Tool</h4>
          <p className="text-xs text-gray-600">
            Calculate circle area using πr² formula. Supports radius, diameter, or circumference input methods. Free educational tool.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Features</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>✓ Instant calculations</li>
            <li>✓ 15+ decimal precision</li>
            <li>✓ No registration needed</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">API Access</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>✓ REST API available</li>
            <li>✓ JSON-LD structured data</li>
            <li>✓ OpenAPI specification</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-200">
        © 2025 AreaOfCircle.com | Free Educational Tool | <a href="https://lab101.com" className="text-blue-600 hover:text-blue-800">Part of Lab101 Network</a>
      </div>
    </div>
  </div>
</footer>
    </>
  );
}
