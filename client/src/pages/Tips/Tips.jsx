import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import tipsImage from "../../../public/assets/images/tips-images/morning-run-wallpaper-2400x1350_50.png";
import foodImage from "../../../public/assets/images/tips-images/food.jpg";
import "./tips.css";
import effectiveImage from "../../../public/assets/images/tips-images/tip02.jpeg";
import calfImage from "../../../public/assets/images/tips-images/tip08.jpeg";
import buddyImage from "../../../public/assets/images/tips-images/tip04.jpeg";
import weightImage from "../../../public/assets/images/tips-images/tip05.jpeg";
import takeToImage from "../../../public/assets/images/tips-images/tip06.jpeg";

export default function Tips() {
  return (
    <>
      <div className="tips" style={{ backgroundImage: `url(${tipsImage})` }}>
        <Navbar />
      </div>

      <div className="title-desc">
        <h3>
          If youre aiming to achieve weight loss, youll find a wealth of
          informative articles, valuable tips, effective workout routines, and
          special promotions on this page to support your journey.
        </h3>
        <h2>Helpful articles:</h2>
      </div>
      <div className="tips-container">
        <div className="tip">
          <div
            className="img"
            style={{ backgroundImage: `url(${foodImage})` }}
          ></div>
          <div className="tip-desc">
            <h4>
              Understanding the Role of Nutrition in Your Weight Loss Journey
            </h4>
            <p>
              Nutrition plays a fundamental role in achieving and maintaining
              weight loss. It is often said that weight loss is 80% diet and 20%
              exercise, underscoring the significance of what you eat. Here are
              some key points to consider. <br />
              <br />
              To lose weight, you must create a calorie deficit, meaning you
              consume fewer calories than you burn. This can be achieved by
              reducing your calorie intake, increasing physical activity, or a
              combination of both.
              <br />
              <br /> Pay attention to the balance of macronutrients in your
              diet. A typical weight loss diet includes a moderate intake of
              carbohydrates, a healthy amount of protein, and a controlled
              intake of healthy fats.
            </p>
          </div>
        </div>
        <div className="tip">
          <div
            className="img"
            style={{ backgroundImage: `url(${effectiveImage})` }}
          ></div>
          <div className="tip-desc">
            <h4>Effective Workouts for Burning Fat and Building Muscle</h4>
            <p>
              Effective workouts for burning fat and building muscle typically
              involve a combination of cardiovascular exercises and strength
              training. <br />
              <br />
              Here are some workouts and exercises that can help you achieve
              these goals:
              <br />
              <br /> HIIT workouts involve short bursts of intense exercise
              followed by brief periods of rest or low-intensity exercise. They
              are excellent for burning fat and improving cardiovascular
              fitness. Example: Sprinting for 30 seconds, followed by 1 minute
              of walking, repeated for 15-20 minutes.
              <br />
              <br />
              Incorporating weightlifting or bodyweight exercises like squats,
              deadlifts, bench presses, push-ups, and pull-ups can help build
              muscle. Focus on compound movements that work multiple muscle
              groups simultaneously.
            </p>
          </div>
        </div>
        <div className="tip">
          <div
            className="img"
            style={{ backgroundImage: `url(${buddyImage})` }}
          ></div>
          <div className="tip-desc">
            <h4>How to choose the perfect gym buddy</h4>
            <p>
              Embarking on a fitness journey can be a challenging endeavour.
              While individual determination is crucial, having the right gym
              buddy can make all the difference. <br />
              <br /> A gym buddy isn’t just someone to chat with between sets;
              they should be a source of motivation, support, and a reliable
              friend. In this post, we’ll explore the various factors to
              consider when picking the perfect gym buddy who will help you
              achieve your fitness goals.
            </p>
          </div>
        </div>
        <div className="tip">
          <div
            className="img"
            style={{ backgroundImage: `url(${weightImage})` }}
          ></div>
          <div className="tip-desc">
            <h4>
              How to best support health and wellbeing in a hybrid workforce
            </h4>
            <p>
              Hybrid working offers plenty of advantages to employer and
              employee alike, but it comes with unique challenges, not least in
              supporting employee health and wellbeing. <br />
              <br /> Forward-thinking employers are reimagining what
              fitness-as-a-benefit looks like for a hybrid workforce so they can
              continue to support the physical and mental wellbeing of their
              people – in and out of the office.
            </p>
          </div>
        </div>
        <div className="tip">
          <div
            className="img"
            style={{ backgroundImage: `url(${takeToImage})` }}
          ></div>
          <div className="tip-desc">
            <h4>What Should I Take to the Gym?</h4>
            <p>
              Going to the gym shouldn’t be a mission, but you’ll have a more
              efficient workout if you know what to wear and what to pack in
              your gym bag. <br />
              <br /> Have you been wondering what should I take to the gym?{" "}
              <br />
              <br /> Here’s a list of things to take to the gym to get you
              motivated, make your workout more enjoyable and help you recover
              faster. A workout plan The best way to make great progress at the
              time is to have a training plan that tells you what to do every
              session, and builds up over the weeks. Don’t waste time and energy
              by winging it (or spending the whole time walking on the
              treadmill). Breathable gym clothes You don’t need fancy gym kit to
              get a great workout, but the right clothing helps. Forget about
              brands and logos. Just make sure your gym kit is comfortable and
              breathable (which means fabric that won’t hold onto sweat). The
              right footwear A good pair of shoes can make a real difference to
              your gym experience. Trainers are a must, and you should try to
              wear the type of trainers that suit your workout. If you’re a
              runner, wear running shoes. If you do HIIT workouts, wear
              cushioned trainers.
            </p>
          </div>
        </div>
        <div className="tip">
          <div
            className="img"
            style={{ backgroundImage: `url(${calfImage})` }}
          ></div>
          <div className="tip-desc">
            <h4>How to do a calf press on a leg press machine</h4>
            <p>
              A calf press or calf raise is a strength training exercise that
              targets the muscles of your lower legs.
              <br />
              <br /> You can do calf press exercises on various pieces of gym
              equipment (or even with just your body weight). One of the best
              ways to do a calf press is using the leg press machine at your
              gym.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
