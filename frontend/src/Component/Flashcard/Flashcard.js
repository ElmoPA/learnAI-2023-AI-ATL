import "../../Assets/style/Flashcard/Flashcard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const flashcards = [
  {
    front: "Abraham Lincoln",
    back: "16th President of the United States, who led the Union to victory in the American Civil War.",
  },
  {
    front: "John J. Crittenden",
    back: "Senator John J. Crittenden was a member of the Constitutional Union Party and the author of the 1860 Crittenden Compromise.",
  },
  {
    front: "James McPherson",
    back: "James McPherson is a historian who is known for his work on the Civil War.",
  },
  {
    front: "Thomas L. Krannawitter",
    back: "Thomas L. Krannawitter is a former member of the United States House of Representatives from Pennsylvania.",
  },
  {
    front: "Daniel Webster",
    back: "Daniel Webster was a leading Whig politician and orator.",
  },
  {
    front: "Benjamin Franklin",
    back: "Benjamin Franklin was a Founding Father of the United States, a polymath, inventor, statesman, diplomat, printer, scientist, and author.",
  },
  {
    front: "Frederick Douglass",
    back: "Frederick Douglass was a leading abolitionist.",
  },
  {
    front: "Ralph Waldo Emerson",
    back: "Ralph Waldo Emerson was a leading abolitionist.",
  },
  {
    front: "Theodore Parker",
    back: "Theodore Parker was a leading abolitionist.",
  },
  {
    front: "Charles A. Beard",
    back: "Charles A. Beard was an American historian and political scientist.",
  },
  {
    front: "Hinton Rowan Helper",
    back: 'Hinton Rowan Helper was a Southern abolitionist who wrote the book "The Impending Crisis of the South: How to Meet It".',
  },
  {
    front: "Thomas Fleming",
    back: "Thomas Fleming is a historian and author.",
  },
  {
    front: "Henry David Thoreau",
    back: "Henry David Thoreau was an American author, poet, philosopher, abolitionist, naturalist, tax resister, development critic, surveyor, and historian.",
  },
  {
    front: "Samuel Sewall",
    back: "Puritan who wrote The Selling of Joseph, an early abolitionist work.",
  },
  {
    front: "Harriet Beecher Stowe",
    back: "Harriet Beecher Stowe was an American abolitionist and author. She is best known for her novel Uncle Tom's Cabin, which was a major influence in the United States' decision to go to war against the Confederacy.",
  },
  {
    front: "The American Civil War",
    back: "1861\u20131865, a civil war in the United States between northern states that remained loyal to the Union and southern states that had seceded to establish the Confederate States of America.",
  },
  {
    front: "The framing of the Constitution",
    back: "1787, The Constitution was framed and signed, establishing the United States of America.",
  },
  {
    front: "The Missouri Compromise",
    back: "1820, Missouri Compromise, apportionment of territory north for free soil and south for slavery",
  },
  {
    front: "the Haitian Revolution",
    back: '1804 Haiti massacre (referred to at the time as "the horrors of Santo Domingo"), in which former slaves systematically murdered most of what was left of the country\'s white population',
  },
  {
    front: "the Jim Crow era",
    back: "Jim Crow era was 1877-1964, segregation in the South following emancipation.",
  },
  {
    front:
      "the 1859 attempt of John Brown to instigate an armed slave rebellion in the South.",
    back: "1859 attempt of John Brown to instigate an armed slave rebellion in the South. was and what was the event's importance 1859, exacerbated fears of a repeat of the 1804 Haiti massacre.",
  },
  {
    front: "Northwest Territory",
    back: "1787-1803, Northwest Territory was a key territorial event in the leadup to the war.",
  },
  {
    front: "Manifest destiny",
    back: "Manifest destiny heightened the conflict over slavery.",
  },
  {
    front: "Treaty of Guadalupe Hidalgo",
    back: "1848, finalized the conquest of northern Mexico west to California, slaveholding interests looked forward to expanding into these lands",
  },
  {
    front: "Utah War",
    back: "1857 saw Mormon settlers in the Utah territory fighting the US government.",
  },
  {
    front: "Wilmot Proviso",
    back: "1846, first time slavery had become a major congressional issue based on sectionalism, instead of party lines.",
  },
  {
    front: "Kansas\u2013Nebraska Act of 1854",
    back: "1854 Kansas\u2013Nebraska Act, allowed popular sovereignty in the territories, led to the Kansas\u2013Nebraska War.",
  },
  {
    front: "Bleeding Kansas",
    back: "1854-1858, A series of violent events in Kansas Territory over the issue of slavery.",
  },
  {
    front: "Fugitive Slave Act of 1850",
    back: "1850, Compromise of 1850, balanced a free-soil state with a stronger federal fugitive slave law for a political settlement after four years of strife in the 1840s.",
  },
  {
    front: "Dred Scott v. Sandford decision",
    back: "1857, Supreme Court ruled that slaves were property and could not be citizens, further dividing the nation.",
  },
  {
    front: "Hartford Convention",
    back: "Hartford Convention was a meeting of New England Federalists in 1814-1815 to discuss the War of 1812.",
  },
  {
    front: "the Marais des Cygnes massacre of anti-slavery Kansans",
    back: "May 19, 1858, 15 pro-slavery men killed 5 anti-slavery men in Kansas.",
  },
  {
    front: "1860 United States presidential election",
    back: "1860 United States presidential election was in November 1860, the final trigger for secession.",
  },
];
export default function Flashcard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  const currentFlashcard = flashcards[currentIndex];

  const goToNextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlip(false);
    }
  };

  const goToPreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlip(false);
    }
  };

  const setKnow = (index, setKnow) => {
    // set know and don't by index
  };

  return (
    <div className="flash-card-page-container">
      <div className="all-items-container">
        <div
          className={`flash-card-container ${flip ? "flip" : ""}`}
          onClick={() => setFlip(!flip)}
        >
          <div className="flash-card-inner">
            <div className="front">{currentFlashcard.front}</div>
            <div className="back">{currentFlashcard.back}</div>
          </div>
        </div>

        <div className="button-container d-flex justify-content-center">
          <div className="button-inside-container">
            <button
              onClick={() => {
                setKnow(currentIndex, "!know");
              }}
              className="know_button"
            >
              Don't know
            </button>
            <button
              className="arrow_button ml-3 mr-2"
              onClick={goToPreviousCard}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <p className="mt-3 mx-2">
              {currentIndex + 1} / {flashcards.length}
            </p>
            <button className="arrow_button ml-2 mr-3 " onClick={goToNextCard}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <button
              className="know_button"
              onClick={() => {
                setKnow(currentIndex, "know");
              }}
            >
              Know
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
