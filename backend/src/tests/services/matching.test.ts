import {
  calculateCandidateAndGigSuitability,
  calculateSimilarity,
  calculateStringsMatch,
  dotProduct,
  languagesCorrection,
  magnitude,
  profileLevelCorrection,
} from "../../services/MatchingService";
import { GigType } from "../../types/GigTypes";
import { ConsultantType } from "../../types/UserTypes";
import { ProfileLevel } from "../../types/enums/UserEnums";

describe("calculateStringsMatch", () => {
  test("returns number of matches for two diferently sized string arrays", () => {
    expect(
      calculateStringsMatch(
        ["string1", "string2", "string3"],
        ["string1", "string3"]
      )
    ).toBe(2);
  });

  test("returns 0 for two empty arrays", () => {
    expect(calculateStringsMatch([], [])).toBe(0);
  });
});

describe("dotProduct", () => {
  test("returns dot product for two number arrays", () => {
    expect(dotProduct([1, 2, 3], [2, 1, 3])).toBe(13);
  });

  test("returns 0 if one of the arrays is empty", () => {
    expect(dotProduct([], [2, 1, 3])).toBe(0);
  });

  test("returns NaN value for two differently sized arrays", () => {
    expect(dotProduct([1, 2, 3], [2, 1])).toBeNaN();
  });
});

describe("magnitude", () => {
  test("returns magnitude value for an array", () => {
    expect(magnitude([3, 4])).toBe(5);
  });

  test("returns 0 value for an empty array", () => {
    expect(magnitude([])).toBe(0);
  });
});

describe("calculateSimilarity", () => {
  test("returns cosine similarity for two equaly sized arrays", () => {
    const similarity = calculateSimilarity([3, 4], [1, 2]);
    expect(similarity).toBeGreaterThan(0);
    expect(similarity).toBeLessThan(1);
  });

  test("returns 0 value for two empty arrays", () => {
    expect(calculateSimilarity([1, 2, 3], [1, 2])).toBe(0);
  });

  test("returns 0 value for two differently sized arrays", () => {
    expect(calculateSimilarity([1, 2, 3], [1, 2])).toBe(0);
  });
});

describe("profileLevelCorrection", () => {
  test("returns 1 for total match", () => {
    expect(
      profileLevelCorrection(ProfileLevel.ENTRY_LEVEL, ProfileLevel.ENTRY_LEVEL)
    ).toBe(1);
  });

  test("returns 0 for match for 1 step", () => {
    expect(
      profileLevelCorrection(ProfileLevel.ENTRY_LEVEL, ProfileLevel.JUNIOR)
    ).toBe(0);
  });

  test("returns -1 for match for more than 2 steps", () => {
    expect(
      profileLevelCorrection(ProfileLevel.ENTRY_LEVEL, ProfileLevel.MIDDLE)
    ).toBe(-1);
  });
});

describe("languagesCorrection", () => {
  test("returns 1 for total match", () => {
    expect(
      languagesCorrection(["English", "Ukrainian"], ["Ukrainian", "English"])
    ).toBe(1);
  });

  test("returns the percentage of matches for two different arrays", () => {
    expect(languagesCorrection(["English", "Ukrainian"], ["English"])).toBe(
      0.5
    );
  });

  test("returns -1 for match for 0 matches", () => {
    expect(languagesCorrection(["Ukrainian"], ["English"])).toBe(-1);
  });
});

describe("calculateCandidateAndGigSuitability", () => {
  test("returns a suitability score based on candidate and gig data", () => {
    const candidate: ConsultantType = {
      profileLevel: ProfileLevel.SENIOR,
      languages: [
        { id: "1", languageId: "1", userId: "1" },
        { id: "2", languageId: "2", userId: "1" },
      ],
    };

    const gig: GigType = {
      id: "1",
      creatorId: "1",
      title: "Sample Gig",
      skills: [],
      profileLevel: ProfileLevel.MIDDLE,
      languages: [
        {
          id: "1",
          gigId: "1",
          languageId: "1",
          language: { id: "1", name: "Ukrainian" },
        },
      ],
      description: "Sample description",
      publicationDate: new Date(),
    };

    const score = 0.8;

    const suitabilityScore = calculateCandidateAndGigSuitability(
      candidate,
      gig,
      score
    );

    const expectedSuitabilityScore = 69;

    expect(suitabilityScore).toEqual(expectedSuitabilityScore);
  });

  test("returns 0 if the suitability has turned less than 0 after corrections", () => {
    const candidate: ConsultantType = {
      profileLevel: ProfileLevel.SENIOR,
      languages: [
        { id: "1", languageId: "1", userId: "1" },
        { id: "2", languageId: "2", userId: "1" },
      ],
    };

    const gig: GigType = {
      id: "1",
      creatorId: "1",
      title: "Sample Gig",
      skills: [],
      profileLevel: ProfileLevel.EXPERT,
      languages: [
        {
          id: "2",
          gigId: "1",
          languageId: "3",
          language: { id: "3", name: "Spanish" },
        },
      ],
      description: "Sample description",
      publicationDate: new Date(),
    };

    const score = 0.1;

    const suitabilityScore = calculateCandidateAndGigSuitability(
      candidate,
      gig,
      score
    );

    const expectedSuitabilityScore = 0;

    expect(suitabilityScore).toEqual(expectedSuitabilityScore);
  });
});
